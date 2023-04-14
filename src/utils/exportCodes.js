import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment';

const headers = [
  'Batch',
  'Request Id',
  'Scan Attempts',
  'Scanned Date and Time',
  'Status',
  'IP Address',
  'Created At',
  'User Agent',
];

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

export const handleExportCodes = (exportedCodes, fileName) => {
  const updatedExportCodes = exportedCodes.map((item) => ({
    Batch: item.code,
    Request: item?.request_name,
    'Scan Attempts': item.scan_attempts,
    // eslint-disable-next-line no-underscore-dangle
    'Scanned Date and Time': moment(item?.validation_time).format('MMMM DD, yyyy hh:mm A'),
    Status: item.status,
    'IP Address': item?.ip_address,
    'Created At': moment(item?.createdAt).format('MMMM DD, yyyy hh:mm A'),
    'User Agent': item?.user_agent,
  }));
  exportToCSV(updatedExportCodes, headers, fileName);
};
