// function for display time
var currTime = document.getElementById('current-time');

// function for update time and check 
function currentTime() {
    let date = new Date();
    // console.log(date);
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    hh = (hh < 10) ? '0' + hh : hh;
    mm = (mm < 10) ? '0' + mm : mm;
    ss = (ss < 10) ? '0' + ss : ss;

    let time = hh + ':' + mm + ':' + ss;

    currTime.innerText = time;
    let t = setTimeout(function () {
        currentTime()
        if (alarm_list.includes(time)) {
            ringing(time);
        }
    }, 2000)
}

currentTime();

function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

const myList = document.querySelector('.set-alarms-list');

// Adding alarm input from users
let alarm_list = [];
const userInput = document.querySelector('.user-input');
userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    const hour = userInput.hour.value;
    const min = userInput.min.value;
    const sec = userInput.sec.value;
    let new_h = formatTime(hour);
    if (new_h === '0') {
        new_h = '00';
    }
    let new_m = formatTime(min);
    if (new_m === '0') {
        new_m = '00';
    }
    let new_s = formatTime(sec);
    if (new_s === '0') {
        new_s = '00';
    }

    const new_Alarm = `${new_h}:${new_m}:${new_s}:`;
    if (isNaN(new_Alarm)) {
        if (!alarm_list.includes(new_Alarm)) {
            alarm_list.push(new_Alarm);
            shownew_Alarm(new_Alarm);
            addAlarm.reset();
        }
        else {
            alert(`Alarm for ${new_Alarm} already set.`);
        }
    }
    else {
        alert('Invalid Entered Time');
    }
});

// now show new_alarm function & add new alarm in the new list with delete button
function shownew_Alarm(new_alarm) {
    const html = `
    <li class='time-list'>
        <span class='time' style='margin-right: 50px;'>${new_alarm}</span>
        <button class='deleteAlarm time-control' id='delete-button' onclick='remove(this.value)' value=${new_alarm}>Delete Alarm</button>
    </li> 
    `;
    myList.innerHTML += html;
}

// audio for ring alarm
const audio = new Audio('http://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

// adding loop to continue Alarm
audio.loop = true;

// rings audio at the alarm time
function ringing(time) {
    audio.play();
    audio.play();
    alert(`Hey! It is ${time}`);
}

// function for stop the alarm
const clearAlarm = () => {
    audio.pause();
    clearTimeout(alarmTimeout);
    alert('Alarm Cleared');
};

// function for stop the alarm
const mylist = document.getElementsByClassName('set-alarms-list');
mylist.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteAlarm')) {
        e.target.parentElement.remove();
    }
});

// remove alarm list from array when deleteAlarms button is clicked
const remove = (value) => {
    let newList = alarm_list.filter((time) => time != value);
    // clear contents
    alarm_list.length = 0;
    alarm_list.push.apply(alarm_list, newList);
}

