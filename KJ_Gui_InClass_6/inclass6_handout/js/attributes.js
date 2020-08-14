/*
Author: Kyle Jolicoeur
Student at the University of Massachusetts -- Lowell campus.
This file was created for a homework assignment for the Gui Programming I
course in summer of 2020 as an exercise in jQuery.
*/
$(function() {

    //removes class from third list element
    $("#three").removeAttr("class");

    //adds the favorite class to class hot's elements
    let hotList = document.getElementsByClassName("hot");
    for (let i = 0; i < hotList.length; i++){
        $(hotList[i]).addClass("favorite");
    }

});
