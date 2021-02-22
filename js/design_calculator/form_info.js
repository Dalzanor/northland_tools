// Array of site names and the multiplier for hours
export const sites = [
    { name: "High-Rise Building", draftAddition: 4, draftMultiplier: 1 },
    { name: "Large Site", draftAddition: 3, draftMultiplier: 1 },
    { name: "Medium Site", draftAddition: 2, draftMultiplier: 1 },
    { name: "Small Site", draftAddition: 1.5, draftMultiplier: 1 },
    { name: "MAC", draftAddition: 1, draftMultiplier: 1 }
];

// Array of backgrounds and the multiplier for hours
export const backgrounds = [
    { name: "Existing CADs", draftAddition: 0, draftMultiplier: 1 },
    { name: "New CADs", draftAddition: 0, draftMultiplier: 1 },
    { name: "Clean PDF", draftAddition: 0, draftMultiplier: 1.25 },
    { name: "PDF/Image", draftAddition: 0, draftMultiplier: 1.66 },
    { name: "Redraw Layout", draftAddition: 0, draftMultiplier: 2 }
];

// Array of drawing sets and the additional hours for rest of drawing
export const drawings = [
    { name: "Full Set", draftAddition: 4, draftMultiplier: 1 },
    { name: "DD Only", draftAddition: 1.5, draftMultiplier: 1 },
    { name: "CD Only", draftAddition: 1.5, draftMultiplier: 1 },
    { name: "RD Only", draftAddition: 1, draftMultiplier: 1 }
];

// Used for creating dropdown menus
export const dropdowns = [sites, backgrounds, drawings];

// Create an array for extraneous devices and the additional hours for special devices
export const specialDevices = [
    { name: "Door Operator", id: "doorOperatorInfo", draftAddition: 1, designAddition: 2.5 },
    { name: "Interlock/Mantrap", id: "interlockInfo", draftAddition: 1, designAddition: 2 },
    { name: "Intrusion Integration", id: "intrusionInfo", draftAddition: 1, designAddition: 0 },
    { name: "Tailgate Detector", id: "tailgateInfo", draftAddition: 1, designAddition: 0.5 },
    { name: "Turnstile", id: "turnstileInfo", draftAddition: 1, designAddition: 1 },
    { name: "New Technology Integration", id: "newTechInfo", draftAddition: 1, designAddition: 3 },
];

// New Customer add 25% time
export const customers = [
    { name: "New Customer", id: "newCustomer", draftMultiplier: 1 },
    { name: "Existing Customer", id: "existingCustomer", draftMultiplier: .8 },
    // { name: "Apple", id: "appleCustomer", draftMultiplier: .9 }, Just Example not real values
    // { name: "Facebook", id: "facebookCustomer", draftMultiplier: .85 } Just Example not real values
];


