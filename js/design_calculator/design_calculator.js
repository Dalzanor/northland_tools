import { sites, backgrounds, drawings, specialDevices, customers, dropdowns } from "./form_info.js";

// // Adds all items within arrays from imported dropsdowns[] to the html form as an option
for (let i = 0; i < dropdowns.length; i++) {
    for (let j = 0; j < dropdowns[i].length; j++) {
        let opt = document.createElement('option');
        opt.value = dropdowns[i][j].name;
        opt.innerHTML = dropdowns[i][j].name;
        document.getElementsByClassName('dropdownMenu')[i].appendChild(opt);
    }
}

// Creates checkbox form items from imported specialDevices[] for the checkbox list
for (let devices of specialDevices) {
    const div = document.createElement('div');
    div.className = 'form-check';
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = devices.id;
    label.innerHTML = devices.name;
    const input = document.createElement('input');
    input.className = 'form-check-input  checkboxDevice';
    input.type = 'checkbox';
    input.id = devices.id;
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('checkboxList').appendChild(div);
}

// Creates radio buttons from imported customers[] for the radio button list
for (let customer of customers) {
    const div = document.createElement('div');
    div.className = 'form-check';
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = customer.id;
    label.innerHTML = customer.name;
    const input = document.createElement('input');
    input.className = 'form-check-input customers';
    input.type = 'radio';
    input.id = customer.id;
    input.name = 'customer';
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('radioList').appendChild(div);
}

//
// All calculation code below. Needs to be cleaned up before deployment.
//

// Run the calculateHours on all elements with class "calcOnUpdate"
for (let i = 0; i < document.getElementsByClassName('calcOnUpdate').length; i++) {
    document.getElementsByClassName('calcOnUpdate')[i].onchange = () => {
        document.getElementById('designHours').textContent = Math.ceil(hoursFromSpecialDesign() * hoursFromDropdownMult() + hoursFromFloorsDesign());
        document.getElementById('draftHours').textContent = Math.round((hoursFromDevices() + hoursFromSpecialDraft() + hoursFromDropdownDraft()) * customerType());
    }
}

function hoursFromDevices() {
    let draftTime = 0;
    let readerCount, cameraCount, alarmCount, panelCount;
    const deviceCounts = document.getElementsByClassName('deviceCounts');
    for (let device of deviceCounts) {
        if (device.id == 'readerCount') {
            readerCount = getValue(device.value);
        }
        else if (device.id == 'cameraCount') {
            cameraCount = getValue(device.value);
        }
        else if (device.id == 'alarmCount') {
            alarmCount = getValue(device.value);
        }
        else if (device.id == 'panelCount') {
            panelCount = getValue(device.value);
        }
    }
    if (readerCount / 16 > panelCount) {
        draftTime += Math.ceil(readerCount / 16);
    }
    else {
        draftTime += panelCount;
    }
    if ((Math.ceil(alarmCount / 24) - Math.round(panelCount)) > 0) {
        draftTime += (Math.ceil(alarmCount / 24) - Math.round(panelCount - 1));
    }
    draftTime += Math.ceil(cameraCount / 24) / 2;
    draftTime += Math.round((getValue(document.getElementById('floorsInfo').value) * multiplierFromBackground()) * 0.85);
    return draftTime;
}

function getValue(value) {
    if (value) {
        return parseInt(value);
    }
    else {
        return 0;
    }
}

function hoursFromSpecialDraft() {
    let draftTime = 0;
    for (let i = 0; i < specialDevices.length; i++) {
        if (document.getElementsByClassName('checkboxDevice')[i].checked == true) {
            draftTime += specialDevices[i].draftAddition;
        }
    }
    return draftTime;
}

function hoursFromSpecialDesign() {
    let designTime = 0;
    for (let i = 0; i < specialDevices.length; i++) {
        if (document.getElementsByClassName('checkboxDevice')[i].checked == true) {
            designTime += specialDevices[i].designAddition;
        }
    }
    return designTime;
}

function hoursFromDropdownDraft() {
    let draftTime = 0;
    for (let i = 0; i < dropdowns.length; i++) {
        for (let j = 0; j < dropdowns[i].length; j++) {
            if (document.getElementsByClassName('dropdownMenu')[i].value == dropdowns[i][j].name) {
                draftTime += dropdowns[i][j].draftAddition;
            }
        }
    }
    return draftTime;
}

function hoursFromDropdownMult() {
    let multiplier = 1;
    for (let i = 0; i < dropdowns.length; i++) {
        for (let j = 0; j < dropdowns[i].length; j++) {
            if (document.getElementsByClassName('dropdownMenu')[i].value == dropdowns[i][j].name) {
                multiplier *= dropdowns[i][j].draftMultiplier;
            }
        }
    }
    return multiplier;
}

function customerType() {
    let multiplier = 1;
    for (let i = 0; i < customers.length; i++) {
        if (document.getElementsByClassName('customers')[i].checked == true) {
            multiplier *= customers[i].draftMultiplier;
        }
    }
    return multiplier;
}

function hoursFromFloorsDesign() {
    let readerCount = getValue(document.getElementById('readerCount').value);
    return Math.ceil(document.getElementById('floorsInfo').value / 2) + Math.floor(readerCount / 20);
}

function multiplierFromBackground() {
    for (let i = 0; i < backgrounds.length; i++) {
        if (document.getElementById('backgroundInfo').value == backgrounds[i].name) {
            return backgrounds[i].draftMultiplier;
        }
    }
    return 1;
}