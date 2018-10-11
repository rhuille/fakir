
d = document.getElementById("dynamics")




addNewColumn = function(){
    console.log("addNewColumn")
    
}


//
const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
let csvContent = "data:text/csv;charset=utf-8,";
rows.forEach(function(rowArray){
   let row = rowArray.join(",");
   csvContent += row + "\r\n";
}); 

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "fakir_data.csv");
link.innerHTML= "Click Here to download";
document.body.appendChild(link); 
