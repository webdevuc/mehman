import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emirates',
  templateUrl: './emirates.component.html',
  styleUrls: ['./emirates.component.scss'],
})
export class EmiratesComponent implements OnInit {
  constructor() {}
  isShowContent = true;
  ngOnInit(): void {
  }

  searchResult(data: string)
  {
    this.isShowContent = false;
  }
}
