import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const exportToCSV = (csvData, myHeader, fileName) => {
  const fileExtension = '.xlsx';
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // Sorting
  const ws = XLSX.utils.json_to_sheet(csvData, {
    header: myHeader,
  });

  const wb = {
    Sheets: { serviceHistory: ws },
    SheetNames: ['serviceHistory'],
  };

  const excelBuffer = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
  });

  const e_data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(e_data, fileName + fileExtension);
};
