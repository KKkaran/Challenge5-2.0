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
    console.log(`${newhour}${am}`)
    //create the hour
    var containerSlot = $("<div>").
                        addClass("d-flex justify-content-between contain")

    var hourSlot = $("<p>").
                    addClass("hour").
                    html(`${newhour}${am}`)
    
    var textSlot = $("<p>").
                    addClass("entry").
                    html(newhour,am)

    var buttonSlot = $("<button>").
                    addClass("btn saveBtn").
                    html("Lock")

    containerSlot.append(hourSlot,textSlot,buttonSlot)
    $(".container").append(containerSlot)

}

getHours()