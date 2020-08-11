$(function() {

    //removes class from third list element
    $("#three").removeAttr("class");

    //adds the favorite class to class hot's elements
    let hotList = document.getElementsByClassName("hot");
    for (let i = 0; i < hotList.length; i++){
        $(hotList[i]).addClass("favorite");
    }
    
});
