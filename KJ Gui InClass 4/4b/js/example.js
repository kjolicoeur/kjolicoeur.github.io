// Create variables for the welcome message
var greet = 'Greetings,';
var name = ' Scotty.';
var message = ' Please review your order below:';
// Concatenate the three variables above to create the welcome message
var welcome =  greet + name + message;

// Create variables to hold details about the sign
var sign = 'Mohogany Bay';
var tiles = sign.length;
var subTotal = tiles * 5; //$5 for each tile
var shipping = 5.98;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
// Replace the content of that element with the personalized welcome message
document.getElementById('greeting').innerHTML = welcome;

// Get the element that has an id of userSign then update its contents
document.getElementById('userSign').innerHTML = sign;

// Get the element that has an id of tiles then update its contents
document.getElementById('tiles').innerHTML = tiles;

// Get the element that has an id of subTotal then update its contents
document.getElementById('subTotal').innerHTML = '$' +subTotal;

// Get the element that has an id of shipping then update its contents
document.getElementById('shipping').innerHTML = '$' +shipping;

// Get the element that has an id of grandTotal then update its contents
document.getElementById('grandTotal').innerHTML = '$' +grandTotal;
