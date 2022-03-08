let numHours = 18;
let numDivisions = 2;
let minPerDiv = 60/numDivisions;
let totalDivs = numHours*numDivisions;

var tasks = {} 

var penisTest = function () {
    console.log("penis")
}

var updatedate = function(){
    let datestamp = moment().format("MM/DD/YY");
    var todaysdate = document.getElementById("currentDay")
    let timestamp = moment().format("h:mm a");
    todaysdate.innerHTML = "Todays date is " + datestamp + " and the time is " + timestamp;
    // this needs to be updated to include moment.js to display current date
}
  
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
    if (!loadedTasks) {
        tasks = {}
    } else {
        tasks = loadedTasks
        saveToLocalStor();
        return loadedTasks
    }
}

var saveToLocalStor = function () {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

// currently, when saving, it only saves them once/ when building the blocks it does not re-put them into the tasks object
var buildblocks = function (){ // need to add functionality to add prexisting tasks
    var oldTasks = loadLocalTasks()
    for (i = 0; i < numHours; i ++) {
        var timeEl = moment().startOf('day').add(7 + i,"hour");
        var unixTimeEl =  moment(timeEl).unix()*1000;
        var newBlock = $("<li>").addClass("row")
        var timeBlock = $("<h4>")
            .addClass("hour col-sm-3")
            .text(timeEl.format('h:mm a'));
        var taskBlock = $("<h3>")
        $(taskBlock).attr("id", timeEl)
        .text(oldTasks[unixTimeEl])
        timeCheck(timeEl, taskBlock); 
        var newText = taskBlock.textContent
        tasks.unixTimeEl = newText    
            // if  statement for if content is before or after time 
        var saveBlock =$("<span>")
            .addClass(" oi oi-plus saveBtn col-sm-2")// we need to make this have text align center

        // append to parent list
        newBlock.append(timeBlock, taskBlock, saveBlock);

        // append to ul list on the page
        $(".container").append(newBlock);
    }
    saveToLocalStor();
    console.log(tasks)

    
}





// there should be a separate function validating blocks with the time 
    // this also needs to run on an interval system

// task text was clicked
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

// right now, it is only saving the new tasks with the text area 
// we need to have it also save as a h3 object
var saveTaskToBlock = function () {
    // get current value of textarea
    var text = $("textarea").val();
    var textAreaId = $("textarea").attr("id");
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

    var tempArr = []
    tempArr.push({
        text: text,
    })

    var arrname = textAreaId
    tasks[arrname]= (text)
    saveToLocalStor();
}

// either on the click of the save button or clicking somewhere else, the thing block will be saved
//$(".container").on("blur", "textarea", saveTaskToBlock);
$(".container").on("click", ".saveBtn",saveTaskToBlock);

updatedate();
buildblocks();

// this resets the timestamp every minute
setInterval(function(){
    updatedate();
}, 6000)

// this checks the time every 15 minutes and changes colors of the blocks
setInterval(function(){
    
}, 90000)