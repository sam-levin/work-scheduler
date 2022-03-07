let numHours = 12;
let numDivisions = 1;
let minPerDiv = 60/numDivisions;
let totalDivs = numHours*numDivisions;



var updatedate = function(){
    let datestamp = moment().format("MM/DD/YY");
    var todaysdate = document.getElementById("currentDay")
    let timestamp = moment().format("HH:mm");
    todaysdate.innerHTML = "Todays date is " + datestamp + " and the time is " + timestamp;
    // this needs to be updated to include moment.js to display current date
}

var createBlock = function(taskText, taskDate, taskList) {
    // create elements that make up a task item
    var taskLi = $("<li>").addClass("list-group-item");
    var taskSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(taskDate);
    var taskP = $("<p>")
      .addClass("m-1")
      .text(taskText);
  
    // append span and p element to parent li
    taskLi.append(taskSpan, taskP);
    auditTask(taskLi)
  
    // append to ul list on the page
    $("#list-" + taskList).append(taskLi);
  };


var buildblocks = function (){
    for (i = 0; i < totalDivs; i ++) {
        var newBlock = $("<li>").addClass("row")
        var time = i
        var timeBlock = $("<h4>")
            .addClass("block-item col-sm-3")
            .text(time);
        var taskBlock = $("<h3>")
            .addClass("block-item editable col-sm-7")
        var saveBlock =$("<span>")
            .addClass("block-item oi oi-plus plus-button col-sm-2")// we need to make this have text align center

        // append to parent list
        newBlock.append(timeBlock, taskBlock, saveBlock);

        // append to ul list on the page
        $(".container").append(newBlock);
    }
}

// task text was clicked
$(".container").on("click", "h3", function() {
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
  
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("form-control col-sm-7").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
});

$(".container").on("click", ".plus-button", function() {
    // get current value of textarea
    var text = $("textarea").val();
  
    // get status type and position in the list
    /*var status = $(this)
      .closest(".list-group")
      .attr("id")
      .replace("list-", "");
    var index = $(this)
      .closest(".list-group-item")
      .index();
  
    // update task in array and re-save to localstorage
    tasks[status][index].text = text;
    saveTasks();
  */

    // recreate p element
    var taskP = $("<h3>")
      .addClass("col-sm-7")
      .text(text);
  
    // replace textarea with new content
    $("textarea").replaceWith(taskP);
});


// there should be an if statement using moment.js timing to determine if a time block has passed
    // if the time is passed, change bootstrap to grey
    // if the time is within 2 hours, change to orange
    // else, change bootstrap to green


updatedate();
buildblocks();


setInterval(function(){
    updatedate();
}, 6000)
// there should be a set interval of 6000 seconds for refreshing the timestamp
// this can also be used to have the blocks interact with the time stamp here