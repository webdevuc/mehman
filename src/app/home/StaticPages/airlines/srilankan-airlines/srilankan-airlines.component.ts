import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-srilankan-airlines',
  templateUrl: './srilankan-airlines.component.html',
  styleUrls: ['./srilankan-airlines.component.scss']
})
export class SrilankanAirlinesComponent implements OnInit {

  constructor() {}
  isShowContent = true;
  ngOnInit(): void {}

  searchResult(data: string) {
    this.isShowContent = false;
  }
}
