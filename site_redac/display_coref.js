
var copie=document.querySelector("title").textContent;

var url="https://raw.githubusercontent.com/yoannbard/site_redac/main/site_redac/annotations_csv/"+copie+"_N_withAnnotations.csv";

//https://github.com/yoannbard/site_redac/tree/main/site_redac/annotations_csv
//console.log(url);

chargeCSV(url,displayHTMLTable);



// window.onload = function () {
//   var previousUrl= document.referrer;

//   var prevUrl_test="exploration_coref";

// if (prevUrl_test=="exploration_coref"){
//   var checkbox= document.getElementById("checkbox_normalise");
//   checkbox.checked=true;
//   handleChange_text_normalise(checkbox);

//   console.log(checkbox)
  
// }
// else if (prevUrl_test=="exploration"){
//   var checkbox= document.getElementById("checkbox_transcrit");
//   checkbox.checked=true;
//   handleChange_text_transcrit(checkbox);

//   console.log(checkbox)
  
// }

// }


function chargeCSV(url,callBack){
	console.log("fonction chargeCSV url : "+url)
    Papa.parse(url,{
      	download: true,
        delimiter: "\t",
        skipEmptyLines: true,
        
      	complete: function(results) {
      	callBack(results.data)
        console.log("Done with all files");
      }
    });
  }
//consigne =row[10]

function displayHTMLTable(data){
  	//console.log("fonction display")
		var para = "<p>";
		//var data = results.data;

		var string="";

    var cpt_word=0;
    var cpt_elle=0;
    var cpt_il=0;
    var cpt_lenf=0;

    
		for(i=0;i<data.length;i++){
			var row = data[i];
      console.log(row);
			var word=row[1];
			var num=row[0]
      var pos=row[3]
      		//console.log(word);
      var consigne =row[10]

    	var annot_elle=row[17];
    	var annot_il=row[19];
	    var annot_lenf=row[21];
        if (pos!="PUNCT"){
        cpt_word+=1;
        }

		    // cas 1 : on tombe sur une annotation ELLE
		   	if (annot_elle!="_"){
		    word='<mark name="ref_elle" style="background:transparent ;" >'+word+' </mark>'
        if ((i>0 && annot_elle!=data[i-1][17]) || (i==0 && annot_elle!=data[i+1][17])) {
        cpt_elle+=1;
		    }}
		    // cas 2 : on tombe sur une annotation IL
		    if (annot_il!="_"){
		    word='<mark name="ref_il" style="background:transparent ;" >'+word+' </mark>'
        if ((i>0 && annot_il!=data[i-1][19]) || (i==0 && annot_il!=data[i+1][19])){
        cpt_il+=1;
		    }}
		    // cas 3 : on tombe sur une annotation LENF
	      if (annot_lenf!="_"){
	      word='<mark name="ref_lenf" style="background:transparent ;" >'+word+' </mark>'
        if ((i>0 && annot_lenf!=data[i-1][21]) || (i==0 && annot_lenf!=data[i+1][21])){
        cpt_lenf+=1;
	     		      }}

        if (consigne=="consigne"){
          word='<mark name="consigne" style="background:transparent ;" >'+word+' </mark>'
          //console.log(consigne)
          //console.log(word)
        }
	     	//Si on tombe sur un début de phrase on revient à la ligne
	     	if (num=="1"){
          //console.log(row[0])
	      word='<br>'+word
	     		      }
        if (row[0]=="\n"){
          word=""
        }
		    
      
     
			string=string+=word+" ";

      
		}
		para+=string+"</p>";
    positions=get_positions(data)

    var stats="<p>Nombre de mots : <b>"+cpt_word.toString()+"</b><br/>Nombre de maillons <span style='color:#2e81f9'>Elle</span> : <b>"+cpt_elle.toString()+"</b><br/>Nombre de maillons <span style='color:#2fcf42'> Il</span> : <b>"+cpt_il.toString()+"</b><br/>Nombre de maillons <span style='color:#ff8d33'> Les Enfants </span> : <b>"+cpt_lenf.toString()+"</b><br/>Configuration de l'introduction des référents : <b>"+positions
    "</b></p>"
    //console.log(para);
		$("#parsed_csv").html(para);
    $("#stats_texte").html(stats);
    }

function get_positions(data){
  
  //ON RECUP LES POSITIONS PUIS ON LES TRIE PAR VALEURS
    var consigne_firsts=get_Pfirsts(data);
    var maillons_firsts=get_maillons_firsts(data);

    var positions = Object.assign({}, consigne_firsts, maillons_firsts);
    for (const [key, value] of Object.entries(positions)) {
      if(value===null){
        delete positions[key];
      }
    }

    var keyValues = []

    for (var key in positions) {
      keyValues.push([ key, positions[key] ])
    }

    keyValues.sort(function compare(kv1, kv2) {
    // This comparison function has 3 return cases:
    // - Negative number: kv1 should be placed BEFORE kv2
    // - Positive number: kv1 should be placed AFTER kv2
    // - Zero: they are equal, any order is ok between these 2 items
    return kv1[1] - kv2[1]
    })
    //on retourne la string de sortie : 
    var string=String(keyValues[0][0])
    for (index = 1; index < keyValues.length; index++) {
      var operator=""
      if (keyValues[index][1]==keyValues[index-1][1]){
        operator=" = "
      }else{
        operator=" < "
      }
      string=string+operator+String(keyValues[index][0])
    }
    
    return string;

  }

function get_Pfirsts(data){

      const regex_coord = /(?<start>\d+)-\d+/gm;

      var P1 = data.find(function (row){
          return row[17]!="_" & row[10]!="_"
      });

      var P2 = data.find(function (row){
        return row[19]!="_" & row[10]!="_"
      });

      var P3 = data.find(function (row){
          return row[21]!="_" & row[10]!="_"
      });
      
    if (P1 === undefined) {
        P1=null;
      }else{
        P1=P1[8];
      }
    if (P2 === undefined) {
        P2=null;
      }else{
        P2=P2[8]
      }
    if (P3 === undefined) {
        P3=null;
      }else{
        P3=P3[8]
      }
      console.log(P1,P2,P3)
    return {"P1":P1,"P2":P2,"P3":P3};
  }

function get_maillons_firsts(data){
      var first_elle = data.find(function (row){
          return row[17]!="_"
      });

      var first_il = data.find(function (row){
        return row[19]!="_"
      });

      var first_lenf = data.find(function (row){
          return row[21]!="_"
      });

      if (first_elle === undefined) {
        f_elle=null;
      }else{
        f_elle=parseInt(first_elle[9])
      }
      if (first_il === undefined) {
        f_il=null;
      }else{
        f_il=parseInt(first_il[9])
      }
      if (first_lenf === undefined) {
        f_lenf=null;
      }else{
        f_lenf=parseInt(first_lenf[9])
      }
      
      return {"Elle":f_elle,"Il":f_il,"Les enfants":f_lenf};
}


function handleChange_consigne(checkbox) {
//CHECKING boxes
    var maillons = document.querySelectorAll('mark[name="consigne"]');
    if(checkbox.checked == true && checkbox.id == "consigne"){    
        //console.log(maillons);
        for(var x=0;x< maillons.length;x++){
        
          maillons[x].style.background = '#cbcbcb '
          maillons[x].style.opacity = '0.80'
        }
        //div.style.bordercolor="black";

        }
    else if (checkbox.checked==false && checkbox.id == "consigne"){
      //console.log("ok")
      for(var x=0;x< maillons.length;x++){
        
          maillons[x].style.background = 'transparent'
        }
    }
}

// 

    

function handleChange_elle(checkbox) {
//CHECKING boxes
    if(checkbox.checked == true && checkbox.id == "color_elle"){
        var maillons = document.querySelectorAll('mark[name="ref_elle"]');
        //console.log(maillons.length);
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = '#2e81f9 '
          maillons[x].style.opacity = '0.65'
        }
        }
 //UNCHECKING
   else if(checkbox.checked == false && checkbox.id == "color_elle"){
        var maillons = document.querySelectorAll('mark[name="ref_elle"]');
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = 'transparent';
          maillons[x].style.opacity = '1'
        }
        }
  
}

function handleChange_il(checkbox) {
//CHECKING boxes
    if(checkbox.checked == true && checkbox.id == "color_il"){
        var maillons = document.querySelectorAll('mark[name="ref_il"]');
        //console.log(maillons.length);
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = ' #2fcf42 '
          maillons[x].style.opacity = '0.65'
          
        }
        }
 //UNCHECKING
   else if(checkbox.checked == false && checkbox.id == "color_il"){
        var maillons = document.querySelectorAll('mark[name="ref_il"]');
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = 'transparent';
          maillons[x].style.opacity = '1'
        }
        }

}

function handleChange_lenf(checkbox) {
//CHECKING boxes
    if(checkbox.checked == true && checkbox.id == "color_lenf"){
        var maillons = document.querySelectorAll('mark[name="ref_lenf"]');
        //console.log(maillons.length);
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = ' #ff8d33'
          maillons[x].style.opacity = '0.7'
        }
        }
 //UNCHECKING
   else if(checkbox.checked == false && checkbox.id == "color_lenf"){
        var maillons = document.querySelectorAll('mark[name="ref_lenf"]');
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = 'transparent';
          maillons[x].style.opacity = '1'
        }
        }
  
}



