import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-travel-agent-home',
  templateUrl: './business-user-home.component.html',
  styleUrls: ['./business-user-home.component.scss'],
})
export class BusinessUserHomeComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    const owl = $('#slider4');
    owl.owlCarousel({
      loop: true,
      margin: 10,
      // center:true,
      autoplayTimeout: 5000,
      smartSpeed: 450,
      dots: true,
      nav: true,
      navText: [
        '<i class=\'fa fa-angle-left\'></i>',
        '<i class=\'fa fa-angle-right\'></i>',
      ],
      navClass: ['owl-prev', 'owl-next'],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 1,
        },
      },
    });
  }
}
