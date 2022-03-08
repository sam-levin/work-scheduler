let numHours = 18;
let numDivisions = 2;
let minPerDiv = 60/numDivisions;
let totalDivs = numHours*numDivisions;

var tasks = {} 

// this checks the date and time and displays it at the beginning of the page
var updatedate = function(){
    let datestamp = moment().format("MM/DD/YY");
    var todaysdate = document.getElementById("currentDay")
    let timestamp = moment().format("h:mm a");
    todaysdate.innerHTML = "Todays date is " + datestamp + " and the time is " + timestamp;
}

// this checks the time of the task block and change its color
var timeCheck = function (timeId, taskBlock) {
    if (timeId.isBefore(moment())) {
        taskBlock.addClass("description col-sm-7 past")
    } else if (((moment(timeId).diff(moment()))/3600000)< 1 && ((moment(timeId).diff(moment()))/3600000) > 0) {
        taskBlock.addClass(" description col-sm-7 present")
    } else {
        taskBlock.addClass("future description col-sm-7")
    }
};

var loadLocalTasks = function () {
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"))
    // if the loaded tasks returns nothing, it will return an empty object, else it will return the old tasks as an object
    if (!loadedTasks) {
        tasks = {}
        return tasks
    } else {
        tasks = loadedTasks
        saveToLocalStor();
        return loadedTasks
    }
}

// this saves the tasks object as a json string
var saveToLocalStor = function () {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}


var buildblocks = function (){ 
    // this loads existing tasks
    var oldTasks = loadLocalTasks()
    for (i = 0; i < numHours; i ++) {
        var timeEl = moment().startOf('day').add(7 + i,"hour"); // this creates a moment object of the time, starting at 7:00 am of the day and adding i hours 
        var unixTimeEl =  moment(timeEl).unix()*1000; // this creates a unix number of the timeEl moment object
        var newBlock = $("<li>").addClass("row") // this creates a new li
        var timeBlock = $("<h4>")
            .addClass("hour col-sm-3")
            .text(timeEl.format('h:mm a'));
        var taskBlock = $("<h3>")
        $(taskBlock).attr("id", timeEl)
        .text(oldTasks[unixTimeEl])
        timeCheck(timeEl, taskBlock); 
        var newText = taskBlock.textContent
        tasks.unixTimeEl = newText    // this sets the tasks object to have new values
        //this creates a save button
        var saveBlock =$("<span>") 
            .addClass(" oi oi-plus saveBtn col-sm-2")
        // append to parent list
        newBlock.append(timeBlock, taskBlock, saveBlock);
        // append to ul list on the page
        $(".container").append(newBlock);
    }
    saveToLocalStor();

    
}

// when task text was clicked
$(".container").on("click", "h3", function() {
    // get current text of p element
    loadLocalTasks();
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

var saveTaskToBlock = function () {
    // get current value of textarea
    var text = $("textarea").val();
    var textAreaId = $("textarea").attr("id");
    // recreate p element
    var taskP = $("<h3>")
      .addClass("col-sm-7")
      .text(text)
      .attr("id", textAreaId);
    // replace textarea with new content
    $("textarea").replaceWith(taskP);

    // this creates a moment object from the id number to be put back into time check
    var momentObjId = moment.unix(($(taskP).attr("id"))/1000)
    timeCheck(momentObjId,taskP)

    var tempArr = []
    tempArr.push({
        text: text,
    })

    var arrname = textAreaId
    tasks[arrname]= (text)
    saveToLocalStor();
}

// by clicking on the save button, the task will be saved
$(".container").on("click", ".saveBtn",saveTaskToBlock);

updatedate();
buildblocks();

// this resets the timestamp every minute
setInterval(function(){
    updatedate();
}, 6000)

// this checks the time every 15 minutes and changes colors of the blocks
setInterval(function(){
    buildblocks();
}, 90000)