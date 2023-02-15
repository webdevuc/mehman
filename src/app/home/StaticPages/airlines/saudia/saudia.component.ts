import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saudia',
  templateUrl: './saudia.component.html',
  styleUrls: ['./saudia.component.scss']
})
export class SaudiaComponent implements OnInit {

  constructor() {}
  isShowContent = true;
  ngOnInit(): void {}

  searchResult(data: string) {
    this.isShowContent = false;
  }

}
