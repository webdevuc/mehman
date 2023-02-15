import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-margins',
  templateUrl: './margins.component.html',
  styleUrls: ['./margins.component.scss']
})
export class MarginsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
