const currentDateElement = document.getElementById('currentDay');
const timeblockContainer = document.getElementById('timeblock-container');



let currentDate = moment().add(1,'days').format('dddd, MMMM Do');

if(localStorage.getItem('currentDate')){
    if (JSON.parse(localStorage.getItem('currentDate')) != currentDate){
        wipeCalender();
    }
}  else {
    localStorage.setItem('currentDate',JSON.stringify(currentDate));
}


currentDateElement.innerText = currentDate;


let currentTime = moment().hour();


let hoursPast = currentTime-9;

for(let i =0; i <9; i++){
    let timeblock = document.createElement('div');
    let timeblockHour = document.createElement('div');
    let timeblockMain = document.createElement('textarea');
    let timeblockSave = document.createElement('div');
    let saveBtn = document.createElement('button');
    let saveBtnLogo = document.createElement('i');

    timeblock.id = 'timeblock'+i;
    timeblockHour.id = 'timeblockHour'+i;
    timeblockMain.id = 'timeblockMain'+i;
    timeblockSave.id = 'timeblockSave'+i;
    saveBtn.id = 'saveBtn' + i;
    saveBtnLogo.id = 'saveBtnLogo' + i;


    timeblock.className = 'row time-block';
    timeblockHour.className = 'hour pt-2 col-1 d-flex justify-content-end';
    timeblockMain.className = 'text-left pt-2 col-10';
    timeblockSave.className = 'saveBtn col-1 d-flex justify-content-center';
    saveBtnLogo.className = 'fas fa-save';
    saveBtn.className = 'align-self-center'

    if(i+9 === moment().hour()) {
        timeblockMain.className = 'present text-left pt-2 col-10';
    } else if (i+9 < moment().hour()) {
        timeblockMain.className = 'past text-left pt-2 col-10';
    } else {
        timeblockMain.className = 'future text-left pt-2 col-10';
    }

    if (i<3){
        timeblockHour.innerText = 9+i+' am';
    } else if(i===3) {
        timeblockHour.innerText = (9+i) + ' pm';
    } else {
        timeblockHour.innerText = (9+i)-12 + ' pm';
    }

    saveBtn.appendChild(saveBtnLogo);
    timeblockSave.appendChild(saveBtn);

    timeblock.appendChild(timeblockHour);
    timeblock.appendChild(timeblockMain);
    timeblock.appendChild(timeblockSave);


    timeblockContainer.appendChild(timeblock);


    //create event listener for the button

    saveBtn.addEventListener('click',saveFunc);
}

let localStorageArray = [];
if(localStorage.getItem('eventArray')){
    localStorageArray = JSON.parse(localStorage.getItem('eventArray'));
    populateCalendar();
}

function saveFunc(e) {
    let timeblockNum = e.target.id.charAt(e.target.id.length-1);
    localStorageArray[timeblockNum] = document.getElementById('timeblockMain'+timeblockNum).value;
    localStorage.setItem('eventArray',JSON.stringify(localStorageArray));
}

function populateCalendar(){
    for(let i =0;i<9;i++){
        if(localStorageArray[i]){
            document.getElementById('timeblockMain'+i).value = localStorageArray[i]
        }
    }
}

function wipeCalender() {
    for(let i = 0; i <9; i++){
        document.getElementById('timeblockMain'+i).value='';
        localStorage.setItem('eventArray',null);
    }
}