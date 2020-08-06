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
    document.getElementById('errorHoriz').innerHTML = "";
    document.getElementById('errorVert').innerHTML = "";
    document.getElementById('errorHoriz2').innerHTML = "";
    document.getElementById('errorVert2').innerHTML = "";

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
            document.getElementById('errorVert').innerHTML =  msg1 + " \'"+
            vertStart + "\' " + msg2;
            return false;
    }
    if (isNaN(vertEnd) || vertEnd == "") {
            document.getElementById('errorVert').innerHTML =  msg1 + " \'"+
            vertEnd + "\' " + msg2;
            return false;
    }
    if (horizStart > horizEnd) {
        let temp = horizStart;
        horizStart = horizEnd;
        horizEnd = temp;
        document.getElementById('errorHoriz2').innerHTML =  'Kyle assumes you meant for your range to go from ' + horizStart + ' to ' + horizEnd;
    }
    if (vertStart > vertEnd) {
        let temp = vertStart;
        vertStart = vertEnd;
        vertEnd = temp
        document.getElementById('errorVert2').innerHTML =  'Kyle assumes you meant for your range to go from ' + vertStart + ' to ' + vertEnd;
    }
    //start building the table
    //get the range of vertical and horizontal columns
let horizRange = [];
let vertRange = [];
for (let q = horizStart; q <= horizEnd; q++) {
    horizRange.push(q);
}
for (let r = vertStart; r <= vertEnd; r++) {
    vertRange.push(r);
}

    //for loop to build table
    for (let i = 0; i <= vertRange.length; i++) {
        var rows = document.createElement("tr");
        for (let j = 0; j <= horizRange.length; j++) {
            var cell = document.createElement("td");
            if (i == 0 && j == 0) {//do nothing
            }
            else if (i==0 && j !=0) {
                var newText = document.createTextNode(horizRange[j-1]);
                cell.appendChild(newText);
                cell.style.backgroundColor = "black";
                cell.style.color = "white";
                cell.style.textAlign = "right";
            }
            else if (i != 0 && j == 0) {
                var newText = document.createTextNode(vertRange[i-1]);
                cell.appendChild(newText);
                cell.style.backgroundColor = "black";
                cell.style.color = "white";
                cell.style.textAlign = "right";
            }
            else {
                var newText = document.createTextNode(multiply(horizRange[j-1],vertRange [i-1]));
                cell.appendChild(newText);
            }

            rows.appendChild(cell);
        }
        table.appendChild(rows);
    }
    table.style.margin = "20px";
}
function multiply(n1, n2) {
    return n1*n2;
}
function clearTable() {
    document.getElementById('table').innerHTML = "";
     //document.getElementById('table').removeChild(document.querySelector('table'));
    //for (var i=vertEnd; i <document.getElementById("table").rows.length; i--) {
    //    document.getElementById('table').deleteRow(i);
    //}
}
