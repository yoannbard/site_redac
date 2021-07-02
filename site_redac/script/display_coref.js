
document.body.onload=chargeCSV("https://raw.githubusercontent.com/hodaclm/resolco/master/site_redac/annotations_csv/CO-3e-2016-VTAC305-D1-R12-V1_N_withAnnotations.csv",displayHTMLTable)

chargeCSV("https://raw.githubusercontent.com/hodaclm/resolco/master/site_redac/annotations_csv/CO-3e-2016-VTAC305-D1-R12-V1_N_withAnnotations.csv",text2annotations);

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
  	console.log("fonction display")
		var para = "<p>";
		//var data = results.data;

		var string="";
		 
		for(i=0;i<data.length;i++){
			var row = data[i];
			var word=row[1];
			var num=row[0]
      		//console.log(word);
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
	     	//Si on tombe sur un début de phrase on revient à la ligne
	     	if (num=="1"){
	      word='<br>'+word
	     		      }
		      //console.log(word);
      
     
			string=string+=word+" ";
      
		}
		para+=string+"</p>";
    //console.log(para);
		$("#parsed_csv").html(para);
    }


function text2annotations(data){
  var td = document.querySelector('td[name="copie"]');
  var p=td.querySelector('p');
  var text=p.textContent;
  console.log(text);
    console.log("fonction display")

    for(i=0;i<data.length;i++){
      var row = data[i];
      var word=row[1];
      var num=row[0]
          //console.log(word);
          const regex_coord= /(\d+)-(\d+)/;

          var annot_elle=row[24];
          var coord_elle=String(row[25]);

          if(coord_elle != "_"){
            var coord=regex_coord.exec(coord_elle)
            var start=parseInt(coord[1])-1;
            var end=parseInt(coord[2])-1;
            console.log(start,end,text.slice(start,end));


          }

  
    }
}
    

function handleChange_elle(checkbox) {
//CHECKING boxes
    if(checkbox.checked == true && checkbox.id == "color_elle"){
        var maillons = document.querySelectorAll('mark[name="ref_elle"]');
        //console.log(maillons.length);
        for(var x=0;x< maillons.length;x++){
        
        	maillons[x].style.background = '#2e7ff5'
          maillons[x].style.opacity = '0.7'
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
        
        	maillons[x].style.background = 'lightgreen'
          maillons[x].style.opacity = '0.7'
          
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
