$(function() {


    //adds a paragraph before the list
    $('ul').before("<p>Just Updated!</p>");

    let hotList = document.getElementsByClassName("hot");
    //prepends a plus symbol to class hot's elements
    for( let i = 0; i < hotList.length; i++) {
        hotList[i].prepend("+");
    }

    //creates a new list item and places it after the last element
    let newListItem = document.createElement("LI");
    newListItem.appendChild(document.createTextNode("gluten-free dumplings"));
    $('#four').after(newListItem);


});
