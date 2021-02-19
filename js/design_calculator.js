// Create an array for the site names and the multiplier for hours
const sites = [
    { name: "High-Rise Building", value: 4 },
    { name: "Large Site", value: 3 },
    { name: "Medium Site", value: 3 },
    { name: "Small Site", value: 3 },
    { name: "Addition", value: 3 },
    { name: "MAC", value: 3 }
];

// Create an array for the backgrounds and the multiplier for hours
const backgrounds = [
    { name: "Existing CADs", value: 4 },
    { name: "New CADs", value: 3 },
    { name: "Clean PDF", value: 3 },
    { name: "PDF/Image", value: 3 },
    { name: "Redraw Layout", value: 3 }
];

// Create an array for the drawing set and the multiplier for hours
const drawings = [
    { name: "Full Set", value: 4 },
    { name: "DD Only", value: 3 },
    { name: "CD Only", value: 3 },
    { name: "RD Only", value: 3 }
];

// Adds the site choices to the Site Information dropdown
const siteInfo = document.getElementById('siteInfo');
for (let i = 0; i < sites.length; i++) {
    let opt = document.createElement('option');
    opt.value = sites[i].name;
    opt.innerHTML = sites[i].name;
    siteInfo.appendChild(opt);
}

// Adds the background choices to the Background dropdown
const backgroundInfo = document.getElementById('backgroundInfo');
for (let i = 0; i < backgrounds.length; i++) {
    let opt = document.createElement('option');
    opt.value = backgrounds[i].name;
    opt.innerHTML = backgrounds[i].name;
    backgroundInfo.appendChild(opt);
}

// Adds the background choices to the Background dropdown
const drawingInfo = document.getElementById('drawingInfo');
for (let i = 0; i < drawings.length; i++) {
    let opt = document.createElement('option');
    opt.value = drawings[i].name;
    opt.innerHTML = drawings[i].name;
    drawingInfo.appendChild(opt);
}

readerCount.onchange = () => {
    calculateHours();
}
panelCount.onchange = () => {
    calculateHours();
}
cameraCount.onchange = () => {
    calculateHours();
}
alarmCount.onchange = () => {
    calculateHours();
}

function calculateHours() {
    document.getElementById('draftHours').textContent = hoursFromDevices();
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
