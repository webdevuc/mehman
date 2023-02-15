import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pegasus-airline',
  templateUrl: './pegasus-airline.component.html',
  styleUrls: ['./pegasus-airline.component.scss']
})
export class PegasusAirlineComponent implements OnInit {

  constructor() {}
  isShowContent = true;
  ngOnInit(): void {
  }

  searchResult(data: string)
  {
    this.isShowContent = false;
  }

}
