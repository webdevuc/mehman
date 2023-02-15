import { Component, OnInit } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-business-users',
  templateUrl: './business-users.component.html',
  styleUrls: ['./business-users.component.scss']
})
export class BusinessUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    var owl = $('#slider4');
    owl.owlCarousel({
      loop: true,
      margin: 10,
      // center:true,
      autoplayTimeout: 5000,
      smartSpeed: 450,
      dots: true,
      nav: true,
      navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 1
        }
      }
    });
  }

}
