

addNewLabelColumn= function(){
    console.log("addNewLabelColumn")

    var columnEntry = document.createElement("div");
    label.appendChild(columnEntry)

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
    columnNamesInput.push(_)
    _.setAttribute("placeholder", "Choose column name") 
}

addNewNumericColumn = function(){
    console.log("addNewNumericColumn")

    var columnEntry = document.createElement("div");
    numeric.appendChild(columnEntry)

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
    columnNamesInput.push(_)
    _.setAttribute("placeholder", "Choose column name") 
}


//
const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
let csvContent = "data:text/csv;charset=utf-8,";
rows.forEach(function(rowArray){
   let row = rowArray.join(",");
   csvContent += row + "\r\n";
}); 

var encodedUri = encodeURI(csvContent);
var link = document.getElementById("link")
link.setAttribute("href", encodedUri);
link.setAttribute("download", "fakir_data.csv");
link.innerHTML= "Click Here to download";

