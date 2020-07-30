//set up event listener for submitting the form and calculating table
let form = document.getElementById("form");
if(form) {
    form.addEventListener('submit',updateTable);
}
//create table
var table = document.createElement("TABLE");
table.setAttribute("id","table");
//strings for error message
const msg1 = "Your values are invalid";
const msg2 = " is not a valid number. Use only 0-9.";

function updateTable() {
    //reset the error messages to not display
    document.getElementById('errorHoriz').innerHTML = " ";
    document.getElementById('errorVert').innerHTML = " ";

    if (!document.body.contains(document.getElementById("table"))) {
        document.body.appendChild(table);
    }
    else {
        clearTable();
        document.body.appendChild(table);
    }

    //grab text from HTML inputs
    let horizStart = document.getElementById("horizStart").value;
    let horizEnd = document.getElementById("horizEnd").value;
    let vertStart = document.getElementById("vertStart").value;
    let vertEnd =  document.getElementById("vertEnd").value;

    if (isNaN(horizStart) || horizStart == "") {
        document.getElementById('errorHoriz').innerHTML =  msg1 + " \'"+
        horizStart + "\' " + msg2;
        return false;
    }
    if (isNaN(horizEnd) || horizEnd == "") {
        document.getElementById('errorHoriz').innerHTML =  msg1 + " \'"+
        horizEnd + "\' " + msg2;
        return false;
    }
    if (isNaN(vertStart)|| vertStart == "") {
            document.getElementById('errorHoriz').innerHTML =  msg1 + " \'"+
            vertStart + "\' " + msg2;
            return false;
    }
    if (isNaN(vertEnd) || vertEnd == "") {
            document.getElementById('errorHoriz').innerHTML =  msg1 + " \'"+
            vertEnd + "\' " + msg2;
            return false;
    }
    if (horizStart > horizEnd) {
        temp = horizStart;
        horizStart = horizEnd;
        horizEnd = temp;
        document.getElementById('errorVert').innerHTML =  'Kyle assumes you meant for your range to go from ' + horizStart + ' to ' + horizEnd;
    }
    if (vertStart > vertEnd) {
        temp = vertStart;
        vertStart = vertEnd;
        vertEnd = temp
        document.getElementById('errorVert2').innerHTML =  'Kyle assumes you meant for your range to go from ' + vertStart + ' to ' + vertEnd;
    }
    //start building the table
    for (i = vertStart; i <= vertEnd; i++) {
        var rows = table.insertRow(-1);
        for (j = horizStart; j <= horizEnd; j++) {
            var cell = rows.insertCell(-1);
            if (i == vertStart && j == horizStart) {//do nothing, leave blank
            }
            else if (i == vertStart && j != horizStart ) {
                let newText = document.createTextNode(j);
                cell.style.backgroundColor = "black";
                cell.style.color = "white";
                cell.appendChild(newText);
                cell.style.textAlign = "center";
            }
            else if ( i != vertStart && j == horizStart) {
                let newText = document.createTextNode(i);
                cell.appendChild(newText);
                cell.style.backgroundColor = "black";
                cell.style.color = "white";
                cell.style.textAlign = "right";
            }
            else {
                let newText = document.createTextNode(i*j);
                cell.style.textAlign = "center";
                cell.appendChild(newText);
            }
        }
    }
    table.style.margin = "20px";
}
function clearTable() {
    document.getElementById('table').innerHTML = "";
     //document.getElementById('table').removeChild(document.querySelector('table'));
    //for (var i=vertEnd; i <document.getElementById("table").rows.length; i--) {
    //    document.getElementById('table').deleteRow(i);
    //}
}
