const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (data, filename) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filename));
    
    // Add PDF content
    doc.fontSize(25).text('Land Record Details', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14)
       .text(`Parcel ID: ${data.parcel_id}`)
       .text(`Plot Number: ${data.plot_number}`)
       .text(`Owner Name: ${data.owner_name}`)
       .text(`Area: ${data.area} sq.m`)
       .text(`Location: ${data.location}`)
       .text(`Registration Date: ${data.registration_date}`);
    
    doc.end();
    return filename;
};

module.exports = { generatePDF };