import { sites, backgrounds, drawings, specialDevices, customers, dropdowns } from "./form_info.js";

// Adds the site choices to the Site Information dropdown
for (let i = 0; i < dropdowns.length; i++) {
    for (let j = 0; j < dropdowns[i].length; j++) {
        let opt = document.createElement('option');
        opt.value = dropdowns[i][j].name;
        opt.innerHTML = dropdowns[i][j].name;
        document.getElementsByClassName('dropdownMenu')[i].appendChild(opt);
    }
}

// Creates checkbox form items of special devices for the checkbox list
for (let i = 0; i < specialDevices.length; i++) {
    const div = document.createElement('div');
    div.className = 'form-check';
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = specialDevices[i].id;
    label.innerHTML = specialDevices[i].name;
    const input = document.createElement('input');
    input.className = 'form-check-input  checkboxDevice';
    input.type = 'checkbox';
    input.id = specialDevices[i].id;
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('checkboxList').appendChild(div);
}

// Creates radio buttons of customers for the radio button list
for (let i = 0; i < customers.length; i++) {
    const div = document.createElement('div');
    div.className = 'form-check';
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = customers[i].id;
    label.innerHTML = customers[i].name;
    const input = document.createElement('input');
    input.className = 'form-check-input customers';
    input.type = 'radio';
    input.id = customers[i].id;
    input.name = 'customer';
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('radioList').appendChild(div);
}

// Run the calculateHours on all elements with class "calcOnUpdate"
for (let i = 0; i < document.getElementsByClassName('calcOnUpdate').length; i++) {
    document.getElementsByClassName('calcOnUpdate')[i].onchange = () => {
        document.getElementById('designHours').textContent = Math.ceil(hoursFromSpecialDesign() * hoursFromDropdownMult());
        document.getElementById('draftHours').textContent = Math.round((hoursFromDevices() + hoursFromSpecialDraft() + hoursFromDropdownDraft()) * customerType() * 2) / 2;
    }
}

function hoursFromDevices() {
    const deviceCounts = document.getElementsByClassName('deviceCounts');
    for (let i = 0; i < deviceCounts.length; i++) {
        if (deviceCounts[i].id == 'readerCount') {
            var readerCount = getValue(deviceCounts[i].value);
        }
        else if (deviceCounts[i].id == 'cameraCount') {
            var cameraCount = getValue(deviceCounts[i].value);
        }
        else if (deviceCounts[i].id == 'alarmCount') {
            var alarmCount = getValue(deviceCounts[i].value);
        }
        else if (deviceCounts[i].id == 'panelCount') {
            var panelCount = getValue(deviceCounts[i].value);
        }
    }

    let draftTime = 0;
    if (readerCount / 16 > panelCount) {
        draftTime += (Math.ceil(readerCount / 16));
    }
    else {
        draftTime += Math.round(panelCount);
    }
    if ((Math.ceil(alarmCount / 24) - Math.round(panelCount)) > 0) {
        draftTime += (Math.ceil(alarmCount / 24) - Math.round(panelCount));
    }
    draftTime += (Math.ceil(cameraCount / 24) / 2);
    return draftTime;
}

function getValue(value) {
    if (value == '') {
        return 0;
    }
    else {
        return value;
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
