// function for display time
var currTime = document.getElementById('current-time');

// function for update time and check 
function currentTime(){
    let date = new Date();
    // console.log(date);
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    hh= (hh < 10) ? '0' + hh : hh;
    mm= (mm < 10) ? '0' + mm : mm;
    ss= (ss < 10) ? '0' + ss : ss;

    let time = hh + ':' + mm + ':' + ss;

    currTime.innerText = time;
    let t = setTimeout(function(){
        currentTime()
        // if(alarm_list.includes(time)){
        //     ringing(time);
        // }
    }, 2000)
}

currentTime();