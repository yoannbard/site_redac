
var copie=document.querySelector("title").textContent;

var url="https://raw.githubusercontent.com/hodaclm/resolco/master/site_redac/annotations_csv/"+copie+"_N_withAnnotations.csv";

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


function displayHTMLTable(data){
  	//console.log("fonction display")
		var para = "<p>";
		//var data = results.data;

		var string="";
		 
		for(i=0;i<data.length;i++){
			var row = data[i];
      //console.log(row);
			var word=row[1];
			var num=row[0]
      		//console.log(word);
        var consigne =row[18]

      		var annot_elle=row[24];
      		var annot_il=row[26];
		    var annot_lenf=row[28]
		    // cas 1 : on tombe sur une annotation ELLE
		   	if (annot_elle!="_"){
		    word='<mark name="ref_elle" style="background:transparent ;" >'+word+' </mark>'
		    }
		    // cas 2 : on tombe sur une annotation IL
		    if (annot_il!="_"){
		    word='<mark name="ref_il" style="background:transparent ;" >'+word+' </mark>'
		    }
		    // cas 3 : on tombe sur une annotation LENF
	      if (annot_lenf!="_"){
	      word='<mark name="ref_lenf" style="background:transparent ;" >'+word+' </mark>'
	     		      }

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
    //console.log(para);
		$("#parsed_csv").html(para);
    }


function handleChange_consigne(checkbox) {
//CHECKING boxes
    var maillons = document.querySelectorAll('mark[name="consigne"]');
    if(checkbox.checked == true && checkbox.id == "consigne"){    
        console.log(maillons);
        for(var x=0;x< maillons.length;x++){
        
          maillons[x].style.background = '#cbcbcb '
          maillons[x].style.opacity = '0.80'
        }
        //div.style.bordercolor="black";

        }
    else if (checkbox.checked==false && checkbox.id == "consigne"){
      console.log("ok")
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


//function handleChange_text_transcrit(checkbox) {
// //CHECKING boxes
//     var div = document.querySelector('div[id="texte_transcrit"]');
//     if(checkbox.checked == true){    
//         console.log(div);
//         div.style.display="block";

//         }
//     else if (checkbox.checked==false){
//       div.style.display="none";
//     }
// }

// function handleChange_text_normalise(checkbox) {
// //CHECKING boxes
//     var div = document.querySelector('div[id="texte_normalise"]');
//     var texte = document.querySelector('div[id="parsed_csv"]');
//     if(checkbox.checked == true){
//         console.log(div);
//         div.style.display="block";
//         texte.style.display="block";
//         }
//     else if (checkbox.checked==false){
//       div.style.display="none";
//       texte.style.display="none";
//     }
  
// }
