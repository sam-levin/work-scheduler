let numHours = 12;
let numDivisions = 4;
let minPerDiv = 60/numDivisions;
let totalDivs = numHours*numDivisions;



var updatedate = function(){
    let datestamp = moment().format("MM/DD/YY");
    var todaysdate = document.getElementById("currentDay")
    let timestamp = moment().format("HH:mm");
    todaysdate.innerHTML = "Todays date is " + datestamp + " and the time is " + timestamp;
    // this needs to be updated to include moment.js to display current date
}


var buildblocks = function (){
    for (i = 0; i < totalDivs; i ++) {
        console.log(i)
    }
}

// for loop to build out blocks of each day
    // for each 30 min block in the day, build a block
        // each block has 3 pieces
        // a time, the main content, and the save button
        // time and save should be 2 each, with main being 8 widths
    // blocks should then be given functionality

// css of the blocks
    // they need to be centered
    // css needs to be dynamic with the time
    // they do not need to be draggable

// functionality of the blocks
    // they need to have bootstrap classes to align them
    // they need to be clickable
    // they need to have a save button

// there should be an if statement using moment.js timing to determine if a time block has passed
    // if the time is passed, change bootstrap to grey
    // if the time is within 2 hours, change to orange
    // else, change bootstrap to green


updatedate();
buildblocks();

// there should be a set interval of 6000 seconds for refreshing the timestamp
// this can also be used to have the blocks interact with the time stamp here