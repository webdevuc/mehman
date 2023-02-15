import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thai',
  templateUrl: './thai.component.html',
  styleUrls: ['./thai.component.scss']
})
export class ThaiComponent implements OnInit {

  constructor() {}
  isShowContent = true;
  ngOnInit(): void {}

  searchResult(data: string) {
    this.isShowContent = false;
  }

}
