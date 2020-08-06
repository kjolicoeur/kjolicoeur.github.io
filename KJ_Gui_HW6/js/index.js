/*
Author: Kyle Jolicoeur
Email: kyle_jolicoeur@student.uml.edu
Author is a University of Massachusetts - Lowell student
enrolled in [COMP.4610] GUI Programming 1 course.
File Created: 8/4/2020
Details: This website is used as a graded programming assignment
for this course. This is a multiplication table generated from a form using JS.
It is validated using the jQuery Validation Plugin https://jqueryvalidation.org/
*/
//set up event listener for submitting the form and calculating table
let form = document.getElementById("form");
if(form) {
    form.addEventListener('submit',updateTable);
}
$.validator.addMethod("greater", function(value, element, params) {
    console.log("val: "+ value + ", param:" + params.value)
    if (element.optional) {
        return false;
    }
    else if (params.value == "") {
        return true;
    }
    else if (value >= params.value) {
            return false;
    }
    else {
        return true;
    }
});
//event listener to validate form
$("button").click(function() {
    if($("#form").valid()) {
        updateTable();
    }
});
//create table
var table = document.createElement("TABLE");
table.setAttribute("id","table");
$("#form").validate({
    rules: {
        horizStart: {
            required: true,
            digits: true,

            greater: horizEnd
        },
        horizEnd: {
            required: true,
            digits: true,
        },
        vertStart: {
            required: true,
            digits: true,
            greater: vertEnd
        },
        vertEnd: {
            required: true,
            digits: true
        }
    },
    messages: {
        horizStart: {
            required: "Please insert a number to the horizontal start#",
            digits: "Please insert only numbers to the horizontal start#",
            greater: "Bounds are in wrong order"
        },
        horizEnd: {
            required: "Please insert a number to the horizontal end#",
            digits: "Please insert only numbers to the horizontal end#",
            greater: "Bounds are in wrong order"
        },
        vertStart: {
            required: "Please insert a number to the horizontal start#",
            digits: "Please insert only numbers to the horizontal start#",
            greater: "Bounds are in wrong order"
        },
        vertEnd: {
            required: "Please insert a number to the horizontal end#",
            digits: "Please insert only numbers to the horizontal end#",
            greater: "Bounds are in wrong order"
        }
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") == "horizStart") {
            error.appendTo("#errorHoriz");
        }
        else if (element.attr("name") == "horizEnd") {
            error.appendTo("#errorHoriz");
        }
        else if (element.attr("name") == "vertStart") {
            error.appendTo("#errorVert");
        }
        else if (element.attr("name") == "vertEnd") {
            error.appendTo("#errorVert2");
        }
    }
});
function updateTable() {

    //insert table into HTML file
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

    //--------------start building the table------------------
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
            var rows = document.createElement("TR");
            for (let j = 0; j <= horizRange.length; j++) {
                var cell = document.createElement("TD");
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
