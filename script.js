var label = document.getElementById("label"),
    numeric = document.getElementById("numeric"),
    labelsInput = [],
    numericInput = [];

addNewLabelColumn= function(){
    console.log("addNewLabelColumn")

    var columnEntry = document.createElement("div");
    label.appendChild(columnEntry)

    var _ = document.createElement("button");
    columnEntry.appendChild(_)
    _.innerHTML = "-"
    _.onclick = removeLabelColumn

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
    _.setAttribute("class","columnNamesInput")
    _.setAttribute("placeholder", "Choose column name") 

    var _ = document.createElement("textarea");
    columnEntry.appendChild(_)
    labelsInput.push(_)
    _.setAttribute("cols", "100 ")
    _.setAttribute("placeholder", "Put here the list of your label separated by '/' Exemple : label 1/label 2/label 3") 

}

removeLabelColumn= function(){
    console.log("removeLabelColumn")
    labelsInput.splice( labelsInput.indexOf(this.parentNode.getElementsByTagName("textarea")) ,1)
    label.removeChild(this.parentNode)
}

removeNumericColumn= function(){
    console.log("removeNumericColumn")
    numericInput.splice( numericInput.indexOf(this.parentNode.getElementsByTagName("textarea")) ,1)
    numeric.removeChild(this.parentNode)
}

addNewNumericColumn = function(){
    console.log("addNewNumericColumn")

    var columnEntry = document.createElement("div");
    numeric.appendChild(columnEntry)

    var _ = document.createElement("button");
    columnEntry.appendChild(_)
    _.innerHTML = "-"
    _.onclick = removeNumericColumn

    var _ = document.createElement("input");
    columnEntry.appendChild(_)
     _.setAttribute("class","columnNamesInput")
    _.setAttribute("placeholder", "Choose column name") 

    _input = {}
    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _input["min"] = _
    _.setAttribute("placeholder", "Choose min value") 

    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _input["max"] = _
    _.setAttribute("placeholder", "Choose max value") 

    var _ = document.createElement("input");
    _.setAttribute("type", "number")
    columnEntry.appendChild(_)
    _input["precision"] = _
    _.setAttribute("placeholder", "Nb digit after decimal")

    numericInput.push(_input)
}

ONE_MINUTE_IN_MILLIS=60000;

addTimeToDate = function(date,increase,time){

    if (time=='Minutes'){
        date.setMinutes(date.getMinutes() + increase);
        return date
    }

    if (time=='Year'){
        date.setFullYear(date.getYear() + increase);
        return date
    }

    if (time=='Month'){
        date.setMonth(date.getMonth() + increase);
        return date
    }

    if (time=='Day'){
        date.setDate(date.getDate() + increase);
        return date
    }

}

toogleDateColumn = function(){
    document.getElementById("dateColumnEntry").classList.toggle('notDisplay')
}

function product(args) {
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

    labelsInputValue = labelsInput.map(function(e){return e.value.split("/")})

    var dateInputValue = [];
    if(document.getElementById("dateCheckbox").checked){
        
        var start = document.getElementById("start").valueAsDate,
            end = document.getElementById("end").valueAsDate,
            granularity = document.querySelector("#granularity").value, 
            format;
            
        
        
        if(document.getElementById("format").value=="" ){
            format = d3.timeFormat("%Y-%m-%d"); 
        }
        else{
            format = d3.timeFormat(document.getElementById("format").value);
        }


        if(start==null || end==null){
            console.log("Date input not valid !")
        }
        else{
            var d = start;
            while(d < end){
                dateInputValue.push(d)
                d = addTimeToDate(d, parseFloat(document.getElementById("step").value), granularity)
            }
            labelsInputValue.push(dateInputValue.map(function(e){return format(e)}))
        }
    }

    var fakir;
    fakir = product(labelsInputValue)
    
    for(i=0; i<numericInput.length; i++){
        var _input = numericInput[i],
            min = parseFloat(_input["min"].value,)
            max = parseFloat(_input["max"].value,)
            precision = Math.pow(10, parseFloat(_input["precision"].value));
        
        fakir.map(function(e){return e.push( Math.round((min+(Math.random()*max))*precision)/precision )});
    }
    
    var columnName = Array.prototype.slice.call( document.getElementsByClassName("columnNamesInput") ).map(function(e){return e.value});
    if(document.getElementById("dateCheckbox").checked){
        columnName.shift()
    }
    
    fakir.unshift(columnName)
    return fakir;
}

generateAndDownloadFakir = function(){

    const rows = generateFakir();
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray){
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
    }); 

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a")
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fakir_data.csv");
    link.click(); 

    // re-init
}

document.getElementById("dateCheckbox").onclick = toogleDateColumn;
document.getElementById("labelButton").onclick = addNewLabelColumn;
document.getElementById("numericButton").onclick = addNewNumericColumn;
document.getElementById("generateButton").onclick = generateAndDownloadFakir;
