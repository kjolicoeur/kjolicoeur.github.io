/*
Author: Kyle Jolicoeur
Email: kyle_jolicoeur@student.uml.edu
Author is a University of Massachusetts - Lowell student
enrolled in [COMP.4610] GUI Programming 1 course.
File Created: 8/4/2020
Details: This website is used as a graded programming assignment
for this course. This is a multiplication table generated from a form using JS.
It is validated using the jQuery Validation Plugin https://jqueryvalidation.org/
This version adds event listeners, adds tabbed ui, and sliders.
*/
//set up event listener for submitting the form and calculating table
let form = document.getElementById("form");
if(form) {
    form.addEventListener('submit',updateTable);
}

$(document).ready(function(){
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

    //Add sliders to html
    $("#horizStartSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#horizStart").val(ui.value);
            displayTempTable();
        }

    });

    $("#horizEndSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#horizEnd").val(ui.value);
            displayTempTable();
        }

    });

    $("#vertStartSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#vertStart").val(ui.value);
            displayTempTable();
        }

    });

    $("#vertEndSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#vertEnd").val(ui.value);
            displayTempTable();
        }

    });

    //event listeners for dynamic table
    $("#horizStart").on("keyup", function() {
        displayTempTable();
    });

    $("#horizStart").on("keydown", function() {
        displayTempTable();
    });

    $("#horizEnd").on("keyup", function() {
        displayTempTable();
    });

    $("#horizEnd").on("keydown", function() {
        displayTempTable();
    });

    $("#vertStart").on("keyup", function() {
        displayTempTable();
    });

    $("#vertStart").on("keydown", function() {
        displayTempTable();
    });

    $("#vertEnd").on("keyup", function() {
        displayTempTable();
    });

    $("#vertEnd").on("keydown", function() {
        displayTempTable();
    });
});
//event listeners for text fields
$("#horizStart").keyup(function () {
    $("#horizStartSlider").slider("option", "value", $("#horizStart").val());
});

$("#horizEnd").keyup(function () {
    $("#horizEndSlider").slider("option", "value", $("#horizEnd").val());
});

$("#vertStart").keyup(function () {
    $("#vertStartSlider").slider("option", "value", $("#vertStart").val());
});

$("#vertEnd").keyup(function () {
    $("#vertEndSlider").slider("option", "value", $("#vertEnd").val());
});

//Adds method greater to be used for validation rules
$.validator.addMethod("greater", function(value, element, params) {
    var boolFirst = value.indexOf("-"); //start#
    var boolSecond = params.value.indexOf("-"); //end#
    if (element.optional) {
        return false;
    }

    else if (params.value == "") {
        return true;
    }

    else if (boolFirst == 0 && boolSecond == 0){
        //Both contain negatives
        return Math.abs(value) > Math.abs(params.value);
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
        return Math.abs(params.value) > Math.abs(value);
    }

    else {
        return true;
    }

});

//event listener to validate form on submit
$("button").click(function() {
    if($("#form").valid()) {
        updateTable();
        let newTab = document.createElement("P");
        newTab.appendChild(document.createTextNode("Saved table to tabbed UI"));
        newTab.setAttribute("padding","10px");
        newTab.id = "dynamicTable";
        $("#dynamicTable").replaceWith(newTab);
    }
});
//creates and updates the dynamic table
function displayTempTable() {
    if ($("#form").valid()){
        let table = document.createElement("TABLE");
        table.setAttribute("id", "dynamicTable");
        generateTable(table);
        $("#dynamicTable").replaceWith(table);
        table.style.float = "right";
    }
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

    }

    else {
        unorderedList = document.getElementById("tabUL");
    }

    //create the tab for tabbed UI
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

    //add close button to each tab
    closeButton.appendChild(closeAction);
    closeButton.setAttribute("class","closeButton");
    newTab.appendChild(closeButton);
    unorderedList.append(newTab);

    //create table
    var table = document.createElement("TABLE");
    table.setAttribute("id","table");
    table.setAttribute("class", "panel")
    generateTable(table);

    //create the div for the tabbed content
    let newTabContent = document.createElement("DIV");
    newTabContent.setAttribute("id", unorderedList.childElementCount-1);
    newTabContent.setAttribute("class", "panel");
    newTabContent.appendChild(table);
    fullList.appendChild(newTabContent);

    $('#myTabs').tabs();
    $("#myTabs").tabs("refresh");
}

//builds the HTML elements for the table and stores in table variable
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

//multiplies two variables
function multiply(n1, n2) {
    return n1*n2;
}
