const xlsx = require('xlsx');
const workbook = xlsx.readFile('e:\\gmb-system-front-end\\gmb-paperwork-system\\measurementsheet\\02-Quotation.xlsx');
for (const sheetName of workbook.SheetNames) {
    console.log('--- Sheet:', sheetName, '---');
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log(JSON.stringify(data.slice(0, 30), null, 2));
}
