var today = new Date();
var hourNow = today.getHours();
var greeting;

//Default welcome in case of an error to avoid whitespace in HTML
greeting = 'Welcome!';
//If-else block to get the time of day 0-12, 12-18, 18-24
//And sets the new greeting to the appropriate wording
if (hourNow <12) {
    greeting = 'Good Morning!';
}
else if (hourNow >=12 && hourNow <18) {
    greeting = 'Good Afternoon!';
}
else if (hourNow >= 18) {
    greeting = 'Good Evening!';
}
document.write('<h3>' + greeting + '</h3>');
