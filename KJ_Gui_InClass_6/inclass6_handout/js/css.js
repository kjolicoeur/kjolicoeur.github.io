$(function() {

    let bgColor = $("#one").css("background-color");
    $("ul").append("<p>" + bgColor + "</p>");

    let listItems = document.getElementsByTagName("li");

    $.each(listItems, function(element, values) {
        $(values).css("background-color", "#c5a996");
        $(values).css("border", "1px solid white");
        $(values).css("color", "black");
        $(values).css("text-shadow", "none");
        $(values).css("font-family","Georgia");
    });
});
