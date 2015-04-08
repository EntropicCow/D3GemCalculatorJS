/*
Code here by EntropicCow (Jose Araujo) 2014
with some code clips from random online sources
feel free to use but give credit where credit is due.
*/
// all the data needed to calculate gem stuff is here, also names of gems
var GemText = [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
var GoldText = [10, 25, 40, 55, 70, 85, 100, 5000, 10000, 20000, 30000, 50000, 75000, 100000, 200000, 300000, 400000, 500000];
var DeathsBreathText = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
var GemUsed = ["Chipped", "Flawed", "Normal", "Flawless", "Perfect", "Radiant", "Square", "Flawless Square", "Perfect Square", "Radiant Square", "Star", "Flawless Star", "Perfect Star", "Radiant Star", "Marquise", "Imperial", "Flawless Imperial", "Royal", "Flawless Royal"];
var GemDesired = ["Chipped", "Flawed", "Normal", "Flawless", "Perfect", "Radiant", "Square", "Flawless Square", "Perfect Square", "Radiant Square", "Star", "Flawless Star", "Perfect Star", "Radiant Star", "Marquise", "Imperial", "Flawless Imperial", "Royal", "Flawless Royal"];

var goldtotal = 0;
var gemtotal = 0;
var deathsbreathtotal = 0;
//all calculation functions return a result which are used
//this calculates the amount of gems needed to obtain desired gem
function CalculateGems(x, y, z) {
var result = 0, i = 0;
    for (i = x; i < y; i++)
        {
        result = ( result > 0) ? result * GemText[i] : result + GemText[i];
        }
return numberWithCommas(result * z);
}
//this calculates gold needed
function CalculateGold(x, y, z)  {
var result = 0, i = 0;

    for (i = x; i < y; i++)
        {
        result = result * GemText[i] + GoldText[i];
        }
return numberWithCommas(result * z);
}
//this calculates death's breath needed
function CalculateDeathsBreath(x, y, z) {
var result = 0, i = 0;

    for (i = x; i < y; i++)
        {
        result = (result > 0) ? result * DeathsBreathText[i] + GemText[i] : DeathsBreathText[i];
        }
return numberWithCommas(result * z);
}
//time needed to process batch. TODO: work on output formatting maybe.
function CalculateTime(x, y, z) {
var seconds = 0, minutes = 0, hours = 0, result = 0, timepercombine = 3, i = 0;

    for (i = x; i < y; i++)
        {
        result = (result > 0) ? timepercombine + result * GemText[i] : timepercombine;
        }
result = result * z;
seconds = Math.floor(result % 60);
minutes = Math.floor(result / 60 % 60);
hours = Math.floor(result / 60 / 60);

   
return ("Total Time: " + numberWithCommas(hours) + ":" + minutes + ":" + seconds)
}
// this is where the magic happens. sanity check code and calling calculation functions using output to modify html.
 function Calculate() {
 var typeused = document.getElementById("mygemtypeused").selectedIndex;
 var typewanted = document.getElementById("mygemtypewanted").selectedIndex;
 var amountwanted = document.getElementById("amountwanted").value;
 // are both gem types input the same? if so return error
    if (typeused === typewanted){
        document.getElementById("gemresult").innerHTML = "";
    document.getElementById("goldresult").innerHTML = "";
    document.getElementById("deathsbreathresult").innerHTML = "";
    document.getElementById("timeresult").innerHTML = "";
    alert("Both gem types are the same.");
    return;
    }
    // is the type used higher grade than wanted? if so return error
    else if (typeused > typewanted) {
    document.getElementById("gemresult").innerHTML = "";
    document.getElementById("goldresult").innerHTML = "";
    document.getElementById("deathsbreathresult").innerHTML = "";
    document.getElementById("timeresult").innerHTML = "";
    alert("Type used is greater than type wanted.");
    return;
     }
     // did user input a non-numerical value? if so inform user with error
     else if (isNaN(amountwanted))
     {
    document.getElementById("gemresult").innerHTML = "";
    document.getElementById("goldresult").innerHTML = "";
    document.getElementById("deathsbreathresult").innerHTML = "";
    document.getElementById("timeresult").innerHTML = "";
    alert(amountwanted + " is not a number. Try again.")
    return;
    }
    // no number entered in amount wanted? Error informing user of oversight
    else if (amountwanted === 0 || amountwanted === "") {
    
    document.getElementById("gemresult").innerHTML = "";
    document.getElementById("goldresult").innerHTML = "";
    document.getElementById("deathsbreathresult").innerHTML = "";
    document.getElementById("timeresult").innerHTML = "";
    alert("Please Enter a number.");
    return;
    }
    //finall, if sanity check passes, call all relevant calculation functions and modify html document to output results
 else
    gemtotal = CalculateGems(typeused, typewanted, amountwanted);
    goldtotal = CalculateGold(typeused, typewanted, amountwanted);
    deathsbreathtotal = CalculateDeathsBreath(typeused, typewanted, amountwanted);
    timetotal = CalculateTime(typeused, typewanted, amountwanted);
    document.getElementById("gemresult").innerHTML = gemtotal + " " + GemUsed[typeused] + " needed to make " + amountwanted + " " + GemDesired[typewanted];
    document.getElementById("goldresult").innerHTML = goldtotal + " " + " gold needed to make " + amountwanted + " " + GemDesired[typewanted];
    document.getElementById("deathsbreathresult").innerHTML = deathsbreathtotal + " Death's Breath needed to make  " + amountwanted + " " + GemDesired[typewanted];
    document.getElementById("timeresult").innerHTML = timetotal;
}
// put commas in large numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// about text
function About() {
    alert("D3 Gem Calculator coded in C# by Jose Araujo\nPorted to Javascript by Jose Araujo\nSpecial Thanks to Dale and William for motivation");
    }