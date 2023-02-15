import { Router } from '@angular/router';
import { TravelAgentService } from './../comman-service/travel-agent.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Status } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyRefundsAndVoidsComponent } from '../apply-refunds-and-voids/apply-refunds-and-voids.component';

@Component({
  selector: 'app-travel-agent-view-request',
  templateUrl: './travel-agent-view-request.component.html',
  styleUrls: ['./travel-agent-view-request.component.scss']
})
export class TravelAgentViewRequestComponent implements OnInit {
  @ViewChild('dt') table: Table;
  refundFlights: Array<any> = [];
  airLines: Array<any> = [];
  statuses = Status;

  //public activatedTab = 'flights';

  constructor(private travelAgentService: TravelAgentService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.getAirLines();
    this.getRefunds();
  }

  addRefundsDialog(): void {    
    const dialogRef = this.dialog.open(ApplyRefundsAndVoidsComponent,{
      backdropClass: 'blurred',
      disableClose: true ,
  });
    dialogRef.afterClosed().subscribe(result => {
      this.getRefunds();
    });
  }

  getRefunds() {
    this.travelAgentService.getViewRefundRequests().subscribe(response => {
      let data = response.data;
      let newList = [];
      console.log("list", data)
      if (data.length)
        data.forEach(element => {
          element.passenger.forEach(item => {
            //console.log("item", item)
            let param = {
              airLine: element.airLine,
              status: item.status,
              pnr: element.pnr,
              refundId: element.refundId,
              refundType: element.refundType,
              remarks: element.remarks,
              requestType: element.requestType,
              route: element.route,
              travelDate: element.travelDate,
              passangerTicketNumber: item.passangerTicketNumber,
              passangerName: item.passangerName,
              createdDate: element.createdDate ? element.createdDate : new Date(),
              amount: item.refundAmount
            }
            newList.push(param)
          });
        });
      this.refundFlights = newList;
    }, error => {

    })
  }

  // getAirLines() {
  //   this.travelAgentService.getAirlines().subscribe(response => {
  //     if (response.data) {
  //       this.airLines = response.data;
  //     }
  //   }, erroor => { });
  // }

  // getAirLineName(id: number) {
  //   let name;
  //   this.airLines.forEach(element => {
  //     if (id == element.id) {
  //       name = element.name;
  //     }
  //   });
  //   return name;
  // }


  // public openRoute(type: string, id?: any) {
  //   this.router.navigate(['/travel-agent/apply-refunds-and-voids', type, id]);
  // }

}
