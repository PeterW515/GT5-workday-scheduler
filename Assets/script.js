//create and set variables for date and timeblock container
const currentDateElement = document.getElementById('currentDay');
const timeblockContainer = document.getElementById('timeblock-container');

//get current date as string
let currentDate = moment().format('dddd, MMMM Do');

//check if current date matches date in localStorage
//this check is used to determine if the calendar data in local storage
//should be used to populate the calendar
if (localStorage.getItem('currentDate')) {
    if (JSON.parse(localStorage.getItem('currentDate')) != currentDate) {
        wipeCalender();
        localStorage.setItem('currentDate', JSON.stringify(currentDate))
    }
} else {
    localStorage.setItem('currentDate', JSON.stringify(currentDate));
}

//add date at top of page
currentDateElement.innerText = currentDate;
//get current hour for past, present, future determination
let currentTime = moment().hour();
let hoursPast = currentTime - 9;

//for each hour in the day, create the elements needed for the row
//then give them ids, classes and add the time 
for (let i = 0; i < 9; i++) {
    let timeblock = document.createElement('div');
    let timeblockHour = document.createElement('div');
    let timeblockMain = document.createElement('textarea');
    let timeblockSave = document.createElement('div');
    let saveBtn = document.createElement('button');
    let saveBtnLogo = document.createElement('i');

    timeblock.id = 'timeblock' + i;
    timeblockHour.id = 'timeblockHour' + i;
    timeblockMain.id = 'timeblockMain' + i;
    timeblockSave.id = 'timeblockSave' + i;
    saveBtn.id = 'saveBtn' + i;
    saveBtnLogo.id = 'saveBtnLogo' + i;

    timeblock.className = 'row time-block';
    timeblockHour.className = 'hour pt-2 col-1 d-flex justify-content-end';
    timeblockMain.className = 'text-left pt-2 col-10';
    timeblockSave.className = 'saveBtn col-1 d-flex justify-content-center';
    saveBtnLogo.className = 'fas fa-save';
    saveBtn.className = 'align-self-center'
    if (i + 9 === currentTime) {
        timeblockMain.className = 'present text-left pt-2 col-10';
    } else if (i + 9 < currentTime) {
        timeblockMain.className = 'past text-left pt-2 col-10';
    } else {
        timeblockMain.className = 'future text-left pt-2 col-10';
    }
    if (i < 3) {
        timeblockHour.innerText = 9 + i + ' am';
    } else if (i === 3) {
        timeblockHour.innerText = (9 + i) + ' pm';
    } else {
        timeblockHour.innerText = (9 + i) - 12 + ' pm';
    }
    saveBtn.appendChild(saveBtnLogo);
    timeblockSave.appendChild(saveBtn);
    timeblock.appendChild(timeblockHour);
    timeblock.appendChild(timeblockMain);
    timeblock.appendChild(timeblockSave);
    timeblockContainer.appendChild(timeblock);
    //create event listener for the button
    saveBtn.addEventListener('click', saveFunc);
}

//create array for holding data in local storage
let localStorageArray = [];
//check if data exists in local storage
//if it does, add data to calendar
if (JSON.parse(localStorage.getItem('eventArray'))) {
    localStorageArray = JSON.parse(localStorage.getItem('eventArray'));
    populateCalendar();
}

//called when save button clicked
function saveFunc(e) {
    //get the timeblock to save
    let timeblockNum = e.target.id.charAt(e.target.id.length - 1);
 
    //add data from calendar to local storage
    localStorageArray[timeblockNum] = document.getElementById('timeblockMain' + timeblockNum).value;
    localStorage.setItem('eventArray', JSON.stringify(localStorageArray));
}

//this function populates the calendar when data exists in local storage
function populateCalendar() {
    //for each row, check if there is a value in local storage
    //if there is then add it to the calendar
    for (let i = 0; i < 9; i++) {
        if (localStorageArray) {
            if (localStorageArray[i]) {
                document.getElementById('timeblockMain' + i).value = localStorageArray[i]
            }
        }
    }
}

//this function erases the local storage data when the local storage
//data is from the day before
function wipeCalender() {
    for (let i = 0; i < 9; i++) {
        localStorage.setItem('eventArray', null);
    }
}