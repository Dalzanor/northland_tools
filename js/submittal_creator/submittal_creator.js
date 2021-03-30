import { customers } from "./customers.js";

// init PDF
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
  addBase(pdfDoc);
}

// Set northland logo and base text at set locations
async function addBase(doc) {
  const pdfDoc = doc;
  const firstPage = pdfDoc.getPages()[0];

  // add logo png
  const pngUrl = 'https://dalzanor.github.io/northland_tools/assets/logos/logo_northland.png';
  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDim = pngImage.scale(0.325);
  firstPage.drawImage(pngImage, {
    x: (firstPage.getWidth() / 2 - pngDim.width / 2),
    y: 200,
    width: pngDim.width,
    height: pngDim.height,
  })

  // add base text
  const texts = ["Prepared By:", "Northland Controls"];
  const textHeights = [155, 115];
  const textSize = 30;
  const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
  for (let i = 0; i < texts.length; i++) {
    let textWidth = timesRomanFont.widthOfTextAtSize(texts[i], textSize);
    let xLocate = (firstPage.getWidth() / 2) - (textWidth / 2);
    firstPage.moveTo(xLocate, textHeights[i]);
    firstPage.drawText(texts[i], {size:textSize});
  }
  
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

// add logo from dropdown
async function addLogo(name) {
  for (let i = 0; i < customers.length; i++) {
    if(name === customers[i].name) {
      const pdfDoc = await PDFLib.PDFDocument.load(document.getElementById('pdf').src);
      const firstPage = pdfDoc.getPages()[0];
      const pngUrl = customers[i].logo;
      const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDim = pngImage.scale(customers[i].size);
      firstPage.drawImage(pngImage, {
        x: (firstPage.getWidth() / 2 - pngDim.width / 2),
        y: 555,
        width: pngDim.width,
        height: pngDim.height,
      })
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      document.getElementById('pdf').src = pdfDataUri;
    }
  }
}

// sets button input to onclick -> run modifyPDF()
const update = document.querySelector('div .updatePDF');
update.onclick = () => {
  let input1 = document.querySelector('#lineOne').value;
  let input2 = document.querySelector('#lineTwo').value;
  let input3 = document.querySelector('#lineThree').value;
  modifyPDF(input1, input2, input3);
}

// sets form dropdown to onchange -> add logo
const update2 = document.querySelector('.onUpdate2');
update2.onchange = () => {
  let input1 = document.querySelector('.onUpdate2').value;
  addLogo(input1);
}

const update3 = document.querySelector('.onUpdate3');
update3.onchange = () => {

}