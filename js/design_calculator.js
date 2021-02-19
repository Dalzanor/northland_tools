readerCount.onchange = () => {
    console.log(hoursFromDevices());
}
panelCount.onchange = () => {
    console.log(hoursFromDevices());
}
// camCount.onchange = () => {
//     console.log('CAM = ' + camCount.value);
//     printMe();
// }
// alCount.onchange = () => {
//     console.log('AL = ' + alCount.value);
//     printMe();
// }

function calculateHours() {

}

function hoursFromDevices() {
    const readerCount = document.getElementById('readerCount');
    const cameraCount = document.getElementById('cameraCount');
    const alarmCount = document.getElementById('alarmCount');
    const panelCount = document.getElementById('panelCount');
    let draftTime = 0;

    if (readerCount.value / 16 > panelCount.value) {
        draftTime += (Math.ceil(readerCount.value / 16));
    }
    else {
        draftTime += Math.round(panelCount.value);
    }
    draftTime += Math.ceil(alarmCount.value / 32) + Math.ceil(cameraCount.value / 24);

    return draftTime;
}

function hoursFromSite() {

}

function hoursFromSpecial() {

}
