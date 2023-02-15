import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qatar-airways',
  templateUrl: './qatar-airways.component.html',
  styleUrls: ['./qatar-airways.component.scss'],
})
export class QatarAirwaysComponent implements OnInit {
  constructor() {}
  isShowContent = true;
  ngOnInit(): void {}

  searchResult(data: string) {
    this.isShowContent = false;
  }
}
