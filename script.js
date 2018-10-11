var label = document.getElementById("label"),
    numeric = document.getElementById("numeric"),
    columnNamesInput = []
    labelsInput = [];

addNewLabelColumn= function(){
    console.log("addNewLabelColumn")

    var columnEntry = document.createElement("div");
    label.appendChild(columnEntry)

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
    columnNamesInput.push(_)
    _.setAttribute("placeholder", "Choose column name") 

    var _ = document.createElement("textarea");
    _.setAttribute("cols", "100 " )
    columnEntry.appendChild(_)
    labelsInput.push(_)
    _.setAttribute("placeholder", "Put here the list of your label") 
}

addNewNumericColumn = function(){
    console.log("addNewNumericColumn")

    var columnEntry = document.createElement("div");
    numeric.appendChild(columnEntry)

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
    columnNamesInput.push(_)
    _.setAttribute("placeholder", "Choose column name") 

    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _.setAttribute("placeholder", "Choose min value") 

    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _.setAttribute("placeholder", "Choose max value") 

    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _.setAttribute("placeholder", "precision") 

}


function product() {
  var args = Array.prototype.slice.call(arguments); // makes array from arguments
  return args.reduce(function tl (accumulator, value) {
    var tmp = [];
    accumulator.forEach(function (a0) {
      value.forEach(function (a1) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}

generateFakir = function(){
    fakir = product()

    return fakir;
}

document.getElementById("labelButton").onclick = addNewLabelColumn;
document.getElementById("numericButton").onclick = addNewNumericColumn;

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
link.innerHTML= "Download your fake data";

