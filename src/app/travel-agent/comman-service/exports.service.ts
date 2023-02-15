import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx/xlsx.mjs';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ExportsService {

  constructor() { }

  exportPdf(DATA) {
    // let rows = [];
    // data.forEach(element => {
    //   console.log(element)
    //   Object.entries(element).forEach(entry => {
    //     console.log(entry)
    //     // rows.push(element[key]);
    //   });
    // });
    // let newData = rows;
    // console.log(rows);
    // const doc = new jsPDF();
    // autoTable(doc, {
    //   head: [columns],
    //   body: [
    //     newData,
    //   ],
    // })

    // doc.save('ledger.pdf')

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('ledger.pdf');
    });
  }

  exportExcel(data) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "ledger");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    var FileSaver = require('file-saver');
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }
}
