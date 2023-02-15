import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/services/common.service';

@Component({
  selector: 'app-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.scss']
})
export class VisasComponent implements OnInit {
  @Input('refundVisas') refundVisas: any;
  statuses = Status;
  constructor() { }

  ngOnInit(): void {
  }

}
