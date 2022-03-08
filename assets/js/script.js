let numHours = 18;
let numDivisions = 2;
let minPerDiv = 60/numDivisions;
let totalDivs = numHours*numDivisions;




var updatedate = function(){
    let datestamp = moment().format("MM/DD/YY");
    var todaysdate = document.getElementById("currentDay")
    let timestamp = moment().format("h:mm a");
    todaysdate.innerHTML = "Todays date is " + datestamp + " and the time is " + timestamp;
    // this needs to be updated to include moment.js to display current date
}
  
var timeCheck = function (timeId, taskBlock) {
    if (timeId.isBefore(moment())) {
        taskBlock.addClass(" description col-sm-7")
        taskBlock.addClass("past")
    } else if (((moment(timeId).diff(moment()))/3600000)< 1 && ((moment(timeId).diff(moment()))/3600000) > 0) {
        taskBlock.addClass("present")
        taskBlock.addClass(" description col-sm-7")

    } else {
        taskBlock.addClass("future");
        taskBlock.addClass(" description col-sm-7")
    }
};

var buildblocks = function (){
    for (i = 0; i < numHours; i ++) {
        var timeEl = moment().startOf('day').add(7 + i,"hour");
        var newBlock = $("<li>").addClass("row")
        var timeBlock = $("<h4>")
            .addClass("  hour col-sm-3")
            .text(timeEl.format('h:mm a'));
        var taskBlock = $("<h3>")
            $(taskBlock).attr("id", timeEl)
            timeCheck(timeEl, taskBlock);
            // if  statement for if content is before or after time 
        var saveBlock =$("<span>")
            .addClass(" oi oi-plus saveBtn col-sm-2")// we need to make this have text align center

        // append to parent list
        newBlock.append(timeBlock, taskBlock, saveBlock);

        // append to ul list on the page
        $(".container").append(newBlock);
    }
}

// there should be a separate function validating blocks with the time 
    // this also needs to run on an interval system

// task text was clicked
$(".container").on("click", "h3", function() {
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
    var currentId = $(this).attr("id")
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("form-control col-sm-7").val(text);
    $(this).replaceWith(textInput);
    $(textInput).attr("id", currentId)
    // auto focus new element
    textInput.trigger("focus");
    // there should maybe be something that makes other tasks unclickable 
});

$(".container").on("click", ".saveBtn", function() {
    // get current value of textarea
    var text = $("textarea").val();
    var textAreaId = $("textarea").attr("id")
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
      .text(text)
      .attr("id", textAreaId);
    // replace textarea with new content
    $("textarea").replaceWith(taskP);
    var momentObjId = moment.unix(($(taskP).attr("id"))/1000)
    timeCheck(momentObjId,taskP)
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