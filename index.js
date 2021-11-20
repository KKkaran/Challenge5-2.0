var tasks = []//list of all the  updated tasks objects
var timetable = []//list derived from local storage at the time of page refresh
//try to get the current day using moment.js and update #currentDay
var currentDay = moment().format("dddd, MMMM DD YYYY")
$("#currentDay").html(currentDay)
//present the time blocks for the day
function getHours(){
    for(let a=0;a<9;a++){
        createTimeBlock(a+9)
    }
}
function createTimeBlock(hour){
    var am = "pm"
    var newhour = hour
    if(hour > 12) {
        
        newhour = hour % 12
    }else if(hour < 12){
        am = "am"
    }
    //create the hour
    var containerSlot = $("<div>").
                        addClass("d-flex justify-content-between contain").
                        attr("id",hour)

    var hourSlot = $("<p>").
                    addClass("timestamp hour").
                    html(`${newhour}${am}`)
    
    var textSlot = $("<p>").
                    addClass("evententry")

    var buttonSlot = $("<button>").
                    addClass("btn saveBtn lock").
                    html("Lock")

    containerSlot.append(hourSlot,textSlot,buttonSlot)
    $(".container").append(containerSlot)

}
function colorCoding(){
    var currentHour = moment().hour()
    console.log(currentHour)
    for(var t=9;t<=17;t++){
        if(t < currentHour){
            $(`#${t}`).children(".evententry").css("background","grey")
        }else if(t === currentHour){
            $(`#${t}`).children(".evententry").css("background","red")
        }else{
            $(`#${t}`).children(".evententry").css("background","green")
        }
    }
}
//locally store the updated tasks
function saveTasks(){
    localStorage.setItem("schedule",JSON.stringify(tasks))
}
function loadTasks(){
    var task = localStorage.getItem("schedule")
    if(!task){
        //console.log("nothing")
        return
    }
    timetable = JSON.parse(task)
    tasks = timetable
    timetable.forEach(element => {
        var hour = element.id
        var text = element.text
        var hourid = `#${hour}`
        $(hourid).children(".evententry").html(text)
    });
    console.log(timetable)
}
//modify on task click
$(".container").on("click",".evententry",function(){
    
    var text = $(this).text().trim()

    var textarea = $("<textarea>").
                    addClass("textarea").
                    val(text)
    $(this).closest("div").children("button").css("background","red")
    $(this).closest("div").children("button").html("Save")

    $(this).replaceWith(textarea)
    textarea.trigger("focus")
})
$(".container").on("blur",".textarea",function(){
    var text = $(this).val().trim()
    var hour = $(this).closest("div").attr("id")
    var hourid = `#${hour}`
    var task = $("<p>").
                addClass("evententry").
                html(text)
    $(this).replaceWith(task)
    //no changes made after triggering textarea change the color of button back to normal
    var ggg;
    tasks.forEach(el =>{
        if(el.id === hour){
            ggg = el.text
            boolean = true
        }
    })
    if(text === ggg ){
        //console.log("no changes made")
        $(hourid).children("button").css("background","#06aed5")
        $(hourid).children("button").html("Lock") 
    }else if(!text){
        $(hourid).children("button").css("background","#06aed5")
        $(hourid).children("button").html("Lock") 
    }
})
$(".container").on("click",".lock", function(){
    $(this).closest("div").children("button").css("background","#06aed5")
    $(this).closest("div").children("button").html("Lock")
    var text = $(this).closest("div").children(".evententry").text().trim()
    var hour = $(this).closest("div").attr("id")
    var ggg;
    var index = -1;
    var myindex
    var boolean = false
    tasks.forEach(el =>{
        index++;
        if(el.id === hour){
            myindex = index
            ggg = el.text
            boolean = true
        }
    })
    if(timetable.length === 0){
        if(!text){
            //console.log("nothin entred")
            return
        }
    }else{
        if(text === ggg ){
            //console.log("no changes made")
            return
        }else if(!boolean){
            if(!text){
                //console.log("empty")
                return
            }
        }
    }
    if(boolean){
        tasks[index][ggg]
        //console.log(`index is: ${index}`)
        var obj = {}
        obj.id = hour
        obj.text = text
        tasks.splice(myindex,1,obj)
    }else{
        var obj = {}
        obj.id = hour
        obj.text = text
        tasks.push(obj)
    }
    saveTasks() 
})
getHours()
loadTasks();
colorCoding();