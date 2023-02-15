import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/services/common.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  @Input('refundFlights') refundFlights: any;
  statuses = Status;
  constructor() { }

  ngOnInit(): void {
    console.log('refunds ', this.refundFlights);
  }

}
