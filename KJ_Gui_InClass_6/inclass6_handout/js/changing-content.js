/*
Author: Kyle Jolicoeur
Student at the University of Massachusetts -- Lowell campus.
This file was created for a homework assignment for the Gui Programming I
course in summer of 2020 as an exercise in jQuery.
*/

$(function() {

    //Change text using .text()
    $("li:contains('pine')").text("Almonds");

    //wraps class hot elements with <em></em>
    let hotList = document.getElementsByClassName("hot");
    //console.log(hotList); //returns array of li elements
    for(let i = 0; i < hotList.length; i++) {
        $(hotList[i]).html('<em>' + hotList[i].innerHTML + '</em>');
    }

    //removes the first li from the list
    $('#one').remove();

})
