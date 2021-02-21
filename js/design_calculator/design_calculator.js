import { sites, backgrounds, drawings, specialDevices, customers, dropdowns } from "./form_info.js";

// Run the calculateHours on all elements with class "calcOnUpdate"
for (let i = 0; i < document.getElementsByClassName('calcOnUpdate').length; i++) {
    document.getElementsByClassName('calcOnUpdate')[i].onchange = () => {
        calculateHours();
    }
}

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
    label.className = 'form-check-label checkboxDevice';
    label.htmlFor = specialDevices[i].id;
    label.innerHTML = specialDevices[i].name;
    const input = document.createElement('input');
    input.className = 'form-check-input';
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
    input.className = 'form-check-input';
    input.type = 'radio';
    input.id = customers[i].id;
    input.name = 'customer';
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('radioList').appendChild(div);
}

// function calculateHours() {
//     console.log("calculating");
// }

// function hoursFromDevices() {
//     for (let i = 0; i < document.getElementsByClassName('deviceCounts'); i++) {
//         const deviceCounts = 
//     }
//     const deviceCounts = document.getElementsByClassName('deviceCounts').value;
//     let draftTime = 0;

//     if (readerCount.value / 16 > panelCount.value) {
//         draftTime += (Math.ceil(readerCount.value / 16));
//     }
//     else {
//         draftTime += Math.round(panelCount.value);
//     }
//     draftTime += Math.ceil(alarmCount.value / 32) + Math.ceil(cameraCount.value / 24);

//     return draftTime;
// }

// function hoursFromSpecial() {
//     for (let i = 0; i < specialDevices.length; i++) {
//         let s1 = document.getElementById(specialDevices[i].id).checked ? specialDevices[i].value : 0;
//     }
// }

// function hoursFromSite() {

// }