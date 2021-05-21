const currentDateElement = document.getElementById('currentDay');
const timeblockContainer = document.getElementById('timeblock-container');

let currentDate = moment().format('dddd, MMMM Do');

currentDateElement.innerText = currentDate;


let currentTime = moment().hour();
let hoursPast = currentTime-9;

for(let i =0; i <9; i++){
    let timeblock = document.createElement('div');
    timeblock.id = 'timeblock'+i;
    timeblock.className = 'row time-block';

    let timeblockHour = document.createElement('div');
    timeblockHour.id = 'timeblockHour'+i;
    timeblockHour.className = 'hour';
    timeblockHour.innerText = 9+i;

    let timeblockMain = document.createElement('div');
    timeblockMain.id = 'timeblockMain'+i;
    timeblockMain.className = 'time-block';
    timeblockMain.innerText = 'test';

    let timeblockSave = document.createElement('div');
    timeblockSave.id = 'timeblockSave'+i;
    timeblockSave.className = 'saveBtn fas fa-save time-block';

    timeblock.appendChild(timeblockHour);
    timeblock.appendChild(timeblockMain);
    timeblock.appendChild(timeblockSave);



    timeblockContainer.appendChild(timeblock);
}

if(hoursPast===0){

}