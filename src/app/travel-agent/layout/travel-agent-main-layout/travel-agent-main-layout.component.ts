import { Component, OnInit, Type } from '@angular/core';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-travel-agent-main-layout',
  templateUrl: './travel-agent-main-layout.component.html',
  styleUrls: ['./travel-agent-main-layout.component.scss']
})
export class TravelAgentMainLayoutComponent implements OnInit {
  footerComponent: Promise<Type<FooterComponent>>;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.footerComponent) {
      this.footerComponent = import('src/app/footer/footer.component').then(({ FooterComponent }) => FooterComponent);
    }
  }
}
