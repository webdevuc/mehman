import { ToasterService } from 'src/app/services/toastr-service';
import { DatePipe } from '@angular/common';
import { TravelAgentService } from './../comman-service/travel-agent.service';
//import jsPDF from 'jspdf';
import { ExportsService } from './../comman-service/exports.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MenuItem } from 'primeng/api';
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-travel-agent-view-ledger',
  templateUrl: './travel-agent-view-ledger.component.html',
  styleUrls: ['./travel-agent-view-ledger.component.scss']
})
export class TravelAgentViewLedgerComponent implements OnInit {
  ledgerDetails = [];
  cols: any[];
  exportColumns;
  public fromDate;
  public toDate;
  public isSearch: boolean;
  public userEmail: string;
  items: MenuItem[];

  constructor(private exportsService: ExportsService,
    private travelAgentService: TravelAgentService,
    private datePipe: DatePipe, private toasterService: ToasterService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserEmail();
    this.createCloumns();
    this.getLedgerDetails();

    this.items = [
      {label: 'Export to PDF', icon: 'pi pi-pdf', command: () => {
        this.exportToPdf();
      }},
      {label: 'Export to Excel', icon: 'pi pi-excel', command: () => {
        this.exportToExcel();
      }}
  ];
  }

  getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
  }

  createCloumns() {
    this.cols = this.getColumns()
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }

  exportToPdf() {
    const doc = new jsPDF('l', 'pt')
    autoTable(doc, {
      columns: this.exportColumns,
      body: this.ledgerDetails,
      margin: {
        top: 30
      },
      didDrawPage: (dataArg) => {
        doc.setFontSize(20);
        doc.setTextColor(40);        
        doc.text('Ledger for Agent ID:' + this.authService.getAgentId(), dataArg.settings.margin.left+15, 22);
      }
    });

    doc.save('Ledger.pdf')
    // let DATA: any = document.getElementById('htmlData');
    // this.exportsService.exportPdf(DATA);
  }

  exportToExcel() {
    this.exportsService.exportExcel(this.ledgerDetails);
  }

  public search() {
    this.isSearch = true;
    if (this.fromDate && this.toDate) {
      let param = {

        fromDate: this.datePipe.transform(this.fromDate, 'yyyy-MM-ddTHH:mm:ss'),
        toDate: this.datePipe.transform(this.toDate, 'yyyy-MM-ddTHH:mm:ss')
      }
      this.getLedgerDetails(param);
    }

  }


  public clearSearch() {
    this.fromDate = null;
    this.toDate = null;
    this.isSearch = false;
    this.getLedgerDetails();
  }

  getColumns() {
    return [
      { field: "completedDate", header: "Date" },
      { field: "entryType", header: "Entry Type" },
      { field: "ticketNumber", header: "Doc/Tkt #" },
      { field: "narration", header: "Narration" },
      { field: "debitAmount", header: "Debit" },
      { field: "creditAmount", header: "Credit" },
      { field: "balance", header: "balance" },
    ];
  }


  public getLedgerDetails(param?: any) {

    this.travelAgentService.getAgentLedger(param).subscribe(response => {
      console.log("response", response)
      if (response.status == 'success') {
        this.ledgerDetails = response.data;
        // let balance = this.ledgerDetails[this.ledgerDetails.length - 1].balance;

        // this.cookieService.set('bl', balance, 2, '/');
        //this.commanService.subjectBalance.next(true);
      } else {
        this.callErrorMessage(response.message);
      }
    }, () => {
      this.callErrorMessage(null);
    });
  }


  callErrorMessage(response) {
    if (response.message) {
      this.toasterService.showError(
        response.message,
        'Error'
      );
    } else {
      this.toasterService.showError(
        'GetLedger Err 1: Unknown; Try Again or Refresh your page',
        'Error'
      );
    }
  }

}
