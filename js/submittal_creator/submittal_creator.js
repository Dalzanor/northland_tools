import { customers } from "./customers.js";
// function readUrl(input) {
  
//     if (input.files && input.files[0]) {
//       let reader = new FileReader();
//       reader.onload = (e) => {
//         let imgData = e.target.result;
//         let imgName = input.files[0].name;
//         input.setAttribute("data-title", imgName);
//         console.log(e.target.result);
//       }
//       reader.readAsDataURL(input.files[0]);
//     }
  
//   }

//init PDF
createPDF();

// Adds all customers to the html form as an option from imported customers.js
for (let i = 0; i < customers.length; i++) { 
  let opt = document.createElement('option');
  opt.value = customers[i].name;
  opt.innerHTML = customers[i].name;
  document.querySelector('#customerList').appendChild(opt);
}

// Creates PDF
async function createPDF() {
  const pdfDoc = await PDFLib.PDFDocument.create();
  const firstPage = pdfDoc.addPage();
  firstPage.setSize(600,800);
  writeOnPDF("Prepared By:", 30, 120, pdfDoc);
  writeOnPDF("Northland Controls", 30, 80, pdfDoc);
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
}

// Modifies PDF from input fields on form
async function modifyPDF(line1, line2, line3) {
  const pdfDoc = await PDFLib.PDFDocument.load(document.getElementById('pdf').src);
  const firstPage = pdfDoc.getPages()[0];
  const { width, height } = firstPage.getSize();
  const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
  const textSize = 30;
  if(line1) {
    let textWidth = timesRomanFont.widthOfTextAtSize(line1, textSize);
    let xLocate = (width / 2) - (textWidth / 2);
    firstPage.moveTo(xLocate, 475);
    firstPage.drawText(line1, {size:textSize});
  }
  if(line2) {
    let textWidth = timesRomanFont.widthOfTextAtSize(line2, textSize);
    let xLocate = (width / 2) - (textWidth / 2);
    firstPage.moveTo(xLocate, 435);
    firstPage.drawText(line2, {size:textSize});
  }
  if(line3) {
    let textWidth = timesRomanFont.widthOfTextAtSize(line3, textSize);
    let xLocate = (width / 2) - (textWidth / 2);
    firstPage.moveTo(xLocate, 395);
    firstPage.drawText(line3, {size:textSize});
  }
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
}

// Write text on a doc with parameters passed in
async function writeOnPDF(text, textSize, textHeight, doc) {
  const pdfDoc = doc;
  const firstPage = pdfDoc.getPages()[0];
  const { width, height } = firstPage.getSize();
  const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
  let textWidth = timesRomanFont.widthOfTextAtSize(text, textSize);
  let xLocate = (width / 2) - (textWidth / 2);
  firstPage.moveTo(xLocate, textHeight);
  firstPage.drawText(text, {size:textSize});
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
}

// Set image at location 
async function addImage(img, height, doc) {
  const pdfDoc = doc;
  const firstPage = pdfDoc.getPages()[0];
  const pngImage = await pdfDoc.embedPng('pngImageBytes');
  const pngDim = pngImage.scale(1.25);
  firstPage.drawImage(pngImage, {
    x: (firstPage.getWidth() / 2) - pngDim.width / 2,
    y: height,
    width: pngDim.width,
    height: pngDim.height,
  })
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
}

// sets form input to onchange run modifyPDF()
const update = document.querySelectorAll('.onUpdate');
for (let node of update) {
  node.onchange = () => {
    let input1 = document.querySelector('#lineOne').value;
    let input2 = document.querySelector('#lineTwo').value;
    let input3 = document.querySelector('#lineThree').value;
    modifyPDF(input1, input2, input3);
  }
}

const pngUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png';
const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
console.log(pngImageBytes);
