// Array of site names and the multiplier for hours
export const sites = [
    { name: "High-Rise Building", draftAddition: 4 },
    { name: "Large Site", draftAddition: 3 },
    { name: "Medium Site", draftAddition: 2 },
    { name: "Small Site", draftAddition: 1.5 },
    { name: "MAC", draftAddition: 1 }
];

// Array of backgrounds and the multiplier for hours
export const backgrounds = [
    { name: "Existing CADs", draftMultiplier: 1 },
    { name: "New CADs", draftMultiplier: 1 },
    { name: "Clean PDF", draftMultiplier: 1.25 },
    { name: "PDF/Image", draftMultiplier: 1.66 },
    { name: "Redraw Layout", draftMultiplier: 2 }
];

// Array of drawing sets and the additional hours for rest of drawing
export const drawings = [
    { name: "Full Set", draftAddition: 4 },
    { name: "DD Only", draftAddition: 1.5 },
    { name: "CD Only", draftAddition: 1.5 },
    { name: "RD Only", draftAddition: 1 }
];

// Used for creating dropdown menus
export const dropdowns = [sites, backgrounds, drawings];

// Create an array for extraneous devices and the additional hours for special devices
export const specialDevices = [
    { name: "Door Operator", id: "doorOperatorInfo", draftAddition: 1, designAddition: 2.5 },
    { name: "Interlock/Mantrap", id: "interlockInfo", value: 3 },
    { name: "Intrusion Integration", id: "intrusionInfo", value: 1 }, //* multiplier
    { name: "Tailgate Detector", id: "tailgateInfo", value: 1, },
    { name: "Turnstile", id: "turnstileInfo", value: 2 },
    { name: "New Technology Integration", id: "newTechInfo", value: 4 },
];

// New Customer add 25% time
export const customers = [
    { name: "New Customer", id: "newCustomer", draftMultiplier: 1.25 },
    { name: "Existing Customer", id: "existingCustomer", draftMultiplier: 1 },
    { name: "Apple", id: "appleCustomer", draftMultiplier: .9 },
    { name: "Facebook", id: "facebookCustomer", draftMultiplier: .85 }
];


