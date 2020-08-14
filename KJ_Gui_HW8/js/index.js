/*  Scrabble board, a JS game.
*   Author: Kyle Jolicoeur kylejolly121@gmail.com
*   File Created: 8/12/2020
*   Purpose: Graded assignment for Gui Programming I at University of Massachusetts Lowell.
*   Creates a playable interface where a user can play with the game board
*   and the user has a tray to play from.
*/
$(function() {


    let letterBag = newTiles();
    $('#playerScore').text("0");

    let letter1 = document.createElement("SPAN");
    letter1.setAttribute("class", "letter");
    $(letter1).draggable({
        containment: '#gameBoard',
    /*    stop: function (event, ui) {
            // top/left position check

        },
        snap: true,
        snapMode: "inner"*/
    });

    let letter2 = document.createElement("SPAN");
    letter2.setAttribute("class", "letter");
    $(letter2).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    let letter3 = document.createElement("SPAN");
    letter3.setAttribute("class", "letter");
    $(letter3).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    let letter4 = document.createElement("SPAN");
    letter4.setAttribute("class", "letter");
    $(letter4).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    let letter5 = document.createElement("SPAN");
    letter5.setAttribute("class", "letter");
    $(letter5).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    let letter6 = document.createElement("SPAN");
    letter6.setAttribute("class", "letter");
    $(letter6).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    let letter7 = document.createElement("SPAN");
    letter7.setAttribute("class", "letter");
    $(letter7).draggable({
        containment: '#gameBoard',
        stop: function (event, ui) {

        },
        snap: true,
        snapMode: "inner"
    });

    $("#letterPosition").append(letter1);
    $("#letterPosition").append(letter2);
    $("#letterPosition").append(letter3);
    $("#letterPosition").append(letter4);
    $("#letterPosition").append(letter5);
    $("#letterPosition").append(letter6);
    $("#letterPosition").append(letter7);


    $('#dropTarget').append(buildDropTargets());
    newGame();

    $('.letter').position({
        my: "top center",
        at: "left bottom-33",
        of: '#playerRack'
    });
});

function newGame() {
    $(".letter img").each(function() {
        $(this).css('display','none');
    })

    $("#playerScore").text("0");
    $('#errorBox').text("Hello World! ;)");
    letterBag = newTiles();
    fillPlayerBar(letterBag);

}
function fillPlayerBar(letterbag){
    var playerBarSize = 9;
    for( let i = 0; i < playerBarSize; i++) {
        $(".letter").each(function () {
            if ($(this).find('img').length) {
                //if there is an image, ignore
                //console.log();
                if($(this).find('img').css('display') == 'none') {
                    $('.letter img:hidden').remove();
                }
            }
            else {
                //create the image
                let tileImg = document.createElement("IMG");
                let tile = generateTileFromBag(letterbag);
                //console.log('T' + tile);
                if (tile == "_") {
                    tile = "Blank";
                }
                // /console.log(tile);
                tileImg.setAttribute("src",`images/Scrabble_Tile_${tile}.jpg`);
                tileImg.style.borderRadius = '10px';

                $(this).html(tileImg);
            }
        })
    }

}

//ONLY CALL THIS FUNCTION TO CREATE NEW LETTERS
function generateTileFromBag(letterbag) {
    //console.log(letterbag); //Returns an array of of 27 objects (A-Z && _)
    let tileNum = null;

    //draws a number until the number-remaining is > 0, and thus able to draw this tileNum
    do {
        tileNum = Math.floor(Math.random() * Object.keys(letterbag).length);
        //.log(tileNum);
    } while(canDraw(tileNum,letterbag));//Stays true while cannot draw

    return drawTile(tileNum, letterbag);
}

//grabs the object out of the letterBag
function numToTile(tile,letterbag) {
    if(letterbag == null) { return -1;}
    else{
        switch(tile) {
            case 0:
                //A
                return Object.keys(letterbag)[0];
                break;
            case 1:
                //B
                return Object.keys(letterbag)[1];
                break;

            case 2:
                //C
                return Object.keys(letterbag)[2];
                break;

            case 3:
                //D
                return Object.keys(letterbag)[3];
                break;

            case 4:
                //E
                return Object.keys(letterbag)[4];
                break;

            case 5:
                //F
                return Object.keys(letterbag)[5];
                break;

            case 6:
                //G
                return Object.keys(letterbag)[6];
                break;

            case 7:
                //H
                return Object.keys(letterbag)[7];
                break;

            case 8:
                //I
                return Object.keys(letterbag)[8];
                break;

            case 9:
                //J
                return Object.keys(letterbag)[9];
                break;

            case 10:
                //K
                return Object.keys(letterbag)[10];
                break;

            case 11:
                //L
                return Object.keys(letterbag)[11];
                break;

            case 12:
                //M
                return Object.keys(letterbag)[12];
                break;

            case 13:
                //N
                return Object.keys(letterbag)[13];
                break;

            case 14:
                //O
                return Object.keys(letterbag)[14];
                break;

            case 15:
                //P
                return Object.keys(letterbag)[15];
                break;

            case 16:
                //Q
                return Object.keys(letterbag)[16];
                break;

            case 17:
                //R
                return Object.keys(letterbag)[17];
                break;

            case 18:
                //S
                return Object.keys(letterbag)[18];
                break;

            case 19:
                //T
                return Object.keys(letterbag)[19];
                break;

            case 20:
                //U
                return Object.keys(letterbag)[20];
                break;

            case 21:
                //V
                return Object.keys(letterbag)[21];
                break;

            case 22:
                //W
                return Object.keys(letterbag)[22];
                break;

            case 23:
                //X
                return Object.keys(letterbag)[23];
                break;

            case 24:
                //Y
                return Object.keys(letterbag)[24];
                break;

            case 25:
                //Z
                return Object.keys(letterbag)[25];
                break;

            case 26:
                //blank space
                //return Object.keys(letterbag)[26];
                return "Blank";
                break;

            default:

                break;
            }
    }
}

function canDraw(tileNum, letterbag) {
        let letterLookup = numToTile(tileNum);
        //console.log("here");
        if(letterLookup.numberRemaining <=0) {
            return true; // true = draw again
        }
        else {
            return false;
        }
}

function drawTile(tileNum, letterbag) {
    if (letterbag == null) {}
    else{
        let letter = "";
        for (const [key, value] of Object.entries(letterbag)) {
            if(`${key}` == Object.keys(letterbag)[tileNum]) {
                // found a match
                letter = key; //string
                //console.log("old:" + value["number-remaining"]);
                if (value["number-remaining"] > 0){
                    value["number-remaining"] -= 1;
                    //console.log("new:" + value["number-remaining"]);
                }
            }
            //console.log(`${key}: ${value}`);
        }
        return letter; //is a character
    }
}


function newTiles() {
    /*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
     *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
     *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
     *    copied or excerpted for educational purposes with credit to the author.
     *  updated by JMH on November 21, 2015 at 10:27 AM
     *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
     *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
     */

    var ScrabbleTiles = [] ;
    ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
    ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
    ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
    ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
    ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
    ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    return ScrabbleTiles;
}

// creates the overlay for the scrabble board image for user interaction
function buildDropTargets() {
    let arr = document.createElement("TABLE");

    for (let i = 0; i < 15; i++) {
        let row = document.createElement("TR");
        row.setAttribute("id",i);
        for(let j = 0; j < 15; j++){
            let cell = document.createElement("TD");
            cell.setAttribute("class","dropTarget");
            cell.setAttribute("id",j);
            row.append(cell);
        }
        arr.append(row);
    }

    return arr;

}
