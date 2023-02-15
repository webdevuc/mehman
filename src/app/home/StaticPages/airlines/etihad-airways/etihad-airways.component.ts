import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etihad-airways',
  templateUrl: './etihad-airways.component.html',
  styleUrls: ['./etihad-airways.component.scss']
})
export class EtihadAirwaysComponent implements OnInit {

  constructor() {}
  isShowContent = true;
  ngOnInit(): void {
  }

  searchResult(data: string)
  {
    this.isShowContent = false;
  }
}
