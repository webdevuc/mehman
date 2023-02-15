import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);


   
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    var owl = $('#slider2');
    owl.owlCarousel({
    loop:true,
    margin: 10,
    //center:true,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:true,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
      items: 1
      },
      600: {
      items: 3
      },
      800: {
        items: 4
        }
    }
    })

    var owl = $('#slider4');
    owl.owlCarousel({
    loop:true,
    margin: 10,
    //center:true,
    autoplayTimeout:5000,
    smartSpeed:450,
    dots:true,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
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
    })



  }

}
