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
//Add slider to html

$(document).ready(function(){
    $("#horizStartSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#horizStart").val(ui.value);
        }
    });
    $("#horizEndSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#horizEnd").val(ui.value);
        }
    });
    $("#vertStartSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#vertStart").val(ui.value);
        }
    });
    $("#vertEndSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#vertEnd").val(ui.value);
        }
    });
    $("#horizStart").on("keydown", function() {
        //start here kyle
    });
    //validation rules
    $("#form").validate({
        rules: {
            horizStart: {
                required: true,
                number: true,
                max:50,
                min:-50,

                greater: horizEnd
            },
            horizEnd: {
                required: true,
                number: true,
                max:50,
                min:-50
            },
            vertStart: {
                required: true,
                number: true,
                max:50,
                min:-50,
                greater: vertEnd
            },
            vertEnd: {
                required: true,
                max:50,
                min:-50,
                number: true
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
                error.appendTo("#errorHoriz2");
            }
            else if (element.attr("name") == "vertStart") {
                error.appendTo("#errorVert");
            }
            else if (element.attr("name") == "vertEnd") {
                error.appendTo("#errorVert2");
            }
        }
    });
});

$("#horizStart").keyup(function () {
    //console.log($("#horizStart").val());
    $("#horizStartSlider").slider("option", "value", $("#horizStart").val());
});
$("#horizEnd").keyup(function () {
    //console.log($("#horizEnd").val());
    $("#horizEndSlider").slider("option", "value", $("#horizEnd").val());
});
$("#vertStart").keyup(function () {
    //console.log($("#vertStart").val());
    $("#vertStartSlider").slider("option", "value", $("#vertStart").val());
});
$("#vertEnd").keyup(function () {
    //console.log($("#vertEnd").val());
    $("#vertEndSlider").slider("option", "value", $("#vertEnd").val());
});
//Adds method greater to be used for validation rules
$.validator.addMethod("greater", function(value, element, params) {
    //console.log("val: " + value);
    //console.log("param:" + params.value);
    var boolFirst = value.indexOf("-"); //start#
    var boolSecond = params.value.indexOf("-"); //end#
    //console.log("value: " + boolFirst + " params: " +boolSecond);
    if (element.optional) {
        return false;
    }
    else if (params.value == "") {
        return true;
    }
    else if (boolFirst == 0 && boolSecond == 0){
        //Both contain negatives
        return value > params.value;

    }
    else if ( boolFirst == 0 && boolSecond < 0) {
        //First is negative, second is positive
        return true;
    }
    else if (boolFirst == -1 && boolSecond == 0) {
        //First is positive, second is negative
        return false;
    }
    else if (boolFirst == -1 && boolSecond == -1) {
        //Both are positive
        return params.value > value;
    }
    /*else if (value >= params.value) {
            return false;
    }*/
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
function displayTempTable() {
    var table = "";
    if (!document.getElementById("#dynamicTable")) {
        table = document.createElement("TABLE");
        table.setAttribute("id","dynamicTable");
    }
    else {
        table = document.getElementById("#dynamicTable");
    }
    generateTable(table);
    $("#dynamicTable").innerHTML(table);
}
//This function creates the tabbed UI, and calls generateTable()
function updateTable() {
    // Insert tabbed interface for the #table object
    //
    // jQuery UI Library
    //
    if(!$("#myTabs").length) {
        let newTabDiv = document.createElement("DIV");
        newTabDiv.setAttribute("id","myTabs");
        document.body.append(newTabDiv);
    }

    let fullList = document.getElementById("myTabs");
    if (document.getElementById("closeAll") == null) {
        let closeAll = document.createElement("A");
        closeAll.setAttribute("href", "#");
        closeAll.setAttribute("id", "closeAll");
        closeAll.appendChild(document.createTextNode("Close All"));
        closeAll.onclick = function (ui, event) {
            ui.preventDefault();
            for (let q = 0; q <= $("#myTabs").length -1; q++) {
                $("#myTabs").find(".ui-tabs-nav li:eq(" + q +")").remove();
                //$("#myTabs").find("#"+q).remove();
                $("#myTabs").remove();
            }

        };

        fullList.appendChild(closeAll);
    }

    let unorderedList = "";
    if(!document.contains(document.getElementById("tabUL"))) {
        unorderedList = document.createElement("UL");
        unorderedList.style.width = "100%";
        unorderedList.setAttribute("id", "tabUL");
        fullList.appendChild(unorderedList);
        //$("#myTabs").style.overflow-x = "scroll";
        //$("#myTabs").style.overflow-y = "scroll";

    }

    else {
        unorderedList = document.getElementById("tabUL");
    }

    let newTab = document.createElement("LI");
    let newLink = document.createElement("A");
    newLink.setAttribute("href", "#"+unorderedList.childElementCount);
    newLink.appendChild(document.createTextNode(unorderedList.childElementCount));
    newTab.appendChild(newLink);
    var closeButton = document.createElement("SPAN");
    var closeAction = document.createElement("A");
    var close = document.createTextNode("X");
    closeAction.appendChild(close);
    closeAction.setAttribute("href","#");
    closeAction.onclick = function(ui, event) {
          var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
          $("#" + panelId).remove();
          $("#myTabs").tabs("refresh");
    };

    closeButton.appendChild(closeAction);
    closeButton.setAttribute("class","closeButton");
    newTab.appendChild(closeButton);
    unorderedList.append(newTab);

    //create table
    var table = document.createElement("TABLE");
    table.setAttribute("id","table");
    table.setAttribute("class", "panel")
    generateTable(table);

    let newTabContent = document.createElement("DIV");
    newTabContent.setAttribute("id", unorderedList.childElementCount-1);
    newTabContent.setAttribute("class", "panel");
    newTabContent.appendChild(table);
    fullList.appendChild(newTabContent);

    $('#myTabs').tabs();
    $("#myTabs").tabs("refresh");
}

function generateTable(table) {

    //grab text from HTML inputs
    let horizStart = document.getElementById("horizStart").value;
    let horizEnd = document.getElementById("horizEnd").value;
    let vertStart = document.getElementById("vertStart").value;
    let vertEnd =  document.getElementById("vertEnd").value;

    let isHorizSNeg = (horizStart.indexOf("-") >= 0); //returns true if negative
    let isHorizENeg = (horizEnd.indexOf("-") >= 0); //returns true if negative
    let isVertSNeg = (vertStart.indexOf("-") >= 0); //returns true if negative
    let isVertENeg = (vertEnd.indexOf("-") >= 0); //returns true if negative
    //console.log("horS:" +horizStart+" horE:" + horizEnd + "verS:" + vertStart + "verE:" + vertEnd);
    console.log("HS: " + isHorizSNeg + " HE: " + isHorizENeg + " VS: " + isVertSNeg + " VE: " + isVertENeg);
    //--------------start building the table------------------
    //get the range of vertical and horizontal columns
    let horizRange = [];
    let vertRange = [];
    if (isHorizSNeg && isHorizENeg) {
        //Both are negatives
        let temp = (+horizEnd - +horizStart);
        for (let offset = 0; offset <= temp; offset++) {
            horizRange.push(+horizStart + +offset);
        }

    }

    else if (isHorizSNeg && !isHorizENeg) {
        //start is negative, end is positive
        let temp = (+horizEnd - +horizStart);
        console.log("temp: " + temp + " end: " + horizEnd);

        for (let offset = 0; offset <= temp; offset++) {
            horizRange.push(+horizStart + +offset);
        }

    }

    else {
        let temp = (+horizEnd - +horizStart);
        for (let offset = 0; offset <= +temp; offset++) {
            horizRange.push(+horizStart + +offset);
        }

    }

    if (isVertSNeg && isVertENeg) {
        let temp = (+vertEnd - +vertStart);
        for (let offset = 0; offset <= temp; offset++) {
            vertRange.push(+vertStart + +offset);
        }

    }

    else if(isVertSNeg && !isVertENeg) {
        let temp = ( vertEnd - vertStart);
        for (let offset = 0; offset <= temp; offset++) {
            vertRange.push(+vertStart + +offset);
        }

    }

    else {
        let temp = (+vertEnd - +vertStart);
        for (let offset = 0; offset <= temp; offset++) {
            vertRange.push(+vertStart + +offset);
        }

    }

    //console.log("horiz: " + horizRange.length);
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

$(".closeButton").on("click", "span.closeButton", function () {
});

//multiplies two variables
function multiply(n1, n2) {
    return n1*n2;
}

// removes table if need be (might be outdated)
function clearTable() {
    document.getElementById('table').innerHTML = "";
     //document.getElementById('table').removeChild(document.querySelector('table'));
    //for (var i=vertEnd; i <document.getElementById("table").rows.length; i--) {
    //    document.getElementById('table').deleteRow(i);
    //}
}
