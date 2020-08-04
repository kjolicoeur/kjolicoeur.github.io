// ADD NEW ITEM TO END OF LIST
var fifth = document.createElement("LI");
var text_five = document.createTextNode("cream");
fifth.appendChild(text_five);
fifth.setAttribute('id','five');

var list = document.querySelector("ul");
list.insertBefore(fifth, list.lastChild.nextSibling);

// ADD NEW ITEM START OF LIST
var zero = document.createElement("LI");
var text = document.createTextNode("kale");
zero.appendChild(text);
zero.setAttribute('id','zero');

list.insertBefore(zero, list.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
zero.setAttribute('class','cool');
var first = document.getElementById('one');
first.setAttribute('class','cool');
var second = document.getElementById('two');
second.setAttribute('class','cool');
var third = document.getElementById('three');
third.setAttribute('class','cool');
var fourth = document.getElementById('four');
fourth.setAttribute('class','cool');
fifth.setAttribute('class','cool');


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var fullList = document.getElementsByTagName("li");
var listNum = document.createElement("SPAN");
var listNumber = document.createTextNode(fullList.length);
listNum.appendChild(listNumber);

var headerText = document.querySelector("h2");
headerText.append(listNum);
