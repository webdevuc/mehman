import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Common } from 'src/app/models/common';
import { ToasterService } from 'src/app/services/toastr-service';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travel-agent-booking-detail',
  templateUrl: './travel-agent-booking-detail.component.html',
  styleUrls: ['./travel-agent-booking-detail.component.scss'],
})
export class TravelAgentBookingDetailComponent implements OnInit {
  id: any;
  booking: any;
  trip: any;
  flightSegments: any[] = [];
  farePrices:any;
  ticketBookingForm: UntypedFormGroup;
  cancelBookingForm: UntypedFormGroup;
  displayCancelBooking: boolean;
  displayBooktheTicket: boolean;
  selectedLogo: any;
  baseFare: any;
  fareandTax:any;
  totalFare:any;
  paymentMethods: any[] = [
    { label: 'Cash', value: '1' },
    { label: 'Bank', value: '2' },
    { label: 'Other', value: '3' },
  ];
  farePrintOption: any[] = [
    { label: 'With Fare', value: '1' },
    { label: 'Without Fare', value: '2' },
    { label: 'Custom Fare', value: '3' },
  ];
  selectedFarePrintOption: any;
  customFare:number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initForm();
    this.primengConfig.ripple = true;
    this.route.params.subscribe((params: Params) => (this.id = params.id));
    console.log(this.id);
    this.selectedFarePrintOption='1';
    this.getBooking(this.id);
  }

  getBookingStatus(rowData) {
    const bookingStatus = Common.getBookingStatus(rowData);
    return bookingStatus;
  }

  getPaymentStatus(rowData) {
    const paymentStatus = Common.getPaymentStatus(rowData);
    return paymentStatus;
  }

  getPaymentType(rowData) {
    const paymentType = Common.getPaymentType(rowData);
    return paymentType;
  }
  getImage() {
    return 'data:image/png;base64,' + this.selectedLogo;
  }

  underConstruction() {
    const html =
      'Please <a href=\'/contact-us\'>contact us</a> to know status of your request';
    Swal.fire({
      title: 'Under Construction',
      html,
      icon: 'info',
    });
  }

  showCancelBookingDialog() {
    this.initForm();
    this.displayCancelBooking = true;
  }

  showBooktheTicketDialog() {
    // this.initForm();
    // this.displayBooktheTicket = true;
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateTicketBooking();
      }
    })

  }

  requestClick() {
    this.underConstruction();
  }
  getTravelClass(classType: any) {
    switch (classType) {
      case 'Y':
        return 'Economy';
      case 'S':
        return 'Premium Economy';
      case 'C':
        return 'Business ';
      case 'J':
        return 'Premium Business';
      case 'F':
        return 'First';
      case 'P':
        return 'Premium First';
    }
  }

  get UserName(): string {
    return this.authService.getName();
  }

  get UserEmail(): string {
    return this.authService.getUserEmail();
  }

  get UserPhone(): string {
    return this.authService.getUserPhoneNo();
  }
  // addPaymentClick(){
  //   Swal.fire('Under Construction - Please contact us to know status of your request')
  // }

  // requestCancelClick(){
  //   Swal.fire('Under Construction - Please' +  '<a  href="#">contact us</a>' + ' to know status of your request')
  // }
  // ticketBookingModal(dialog: TemplateRef<any>) {
  //   this.initForm();
  //   this.dialog.open(dialog, {
  //     context: 'this is some additional data passed to dialog',
  //   });
  // }

  // requestCancelationModal(dialog: TemplateRef<any>) {
  //   this.initForm();
  //   this.dialogService.open(dialog, {
  //     context: 'this is some additional data passed to dialog',
  //   });
  // }

  updateRequestCancelation() {
    if (this.cancelBookingForm.invalid) {
      return;
    }
    const model = {
      id: this.id,
      cancelReason: this.c.cancelReason.value,
    };

    this.userService.cancelBooking(model).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.getBooking(this.id);
          const element = document.getElementById('cancelBooking') as any;
          element.click();
          element.click();
          this.cancelBookingForm.reset();
          this.displayCancelBooking = false;
          //this.getBooking(this.id);
        } else {
          this.toasterService.showError(response.message, "Error");
        }
      },
      () => {
        //this.loading = false;
      },
    );
  }

  updateTicketBooking() {
    // if (this.ticketBookingForm.invalid) {
    //   return;
    // }
    const model = {
      id: this.id,
      isPaymentReceived: true,
      paymentMethod: 2,
    };

    this.userService.ticketBooking(model).subscribe((response) => {
      if (response.status === 'success') {
        this.getBooking(this.id);
        const element = document.getElementById('ticketBooking') as any;
        element.click();
        element.click();
        this.ticketBookingForm.reset();
        //this.getBooking(this.id);
      } else {
        this.toasterService.showError(response.message, "Error");
      }
    });
  }

  initForm() {
    this.ticketBookingForm = this.fb.group({
      paymentReceived: this.fb.control(0, [Validators.required]),
      paymentMethod: this.fb.control('', [Validators.required]),
    });

    this.cancelBookingForm = this.fb.group({
      cancelReason: this.fb.control('', [Validators.required]),
    });
  }

  get t() {
    return this.ticketBookingForm.controls;
  }

  get c() {
    return this.cancelBookingForm.controls;
  }

  getBooking(id: any) {
    this.userService.getBooking(id).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.booking = response.data;
            this.selectedLogo = this.booking.travelAgentLogo;
            if (this.booking.trip) {
              this.trip = this.booking.trip;
              this.flightSegments = this.trip.flightSegments;
              this.farePrices = this.trip.fareDetails.farePrices;
            }
          }
        } else {
          if (response.message) {
            this.toasterService.showError(
              'GetBooking Err 1: Unknown; Try Again',
              'Error'
            );
            // this.errorMessage = response.message;
          } else {
            this.toasterService.showError(
              'GetBooking Err 1: Unknown; Try Again',
              'Error'
            );
            // this.errorMessage = 'GetBookings Err 1: Unknown; Try Again';
            // this.isError = true;
          }
        }
      } else {
        this.toasterService.showError(
          'GetBooking Err 2: Unknown; Try Again',
          'Error'
        );
        // this.errorMessage = 'GetBookings Err 2: Unknown; Try Again';
        // this.isError = true;
      }
    });
  }

  requestSchedule() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  requestCancelation() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  addPayment() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  
  onCustomFarePrint(event) {
    
    this.selectedFarePrintOption = event.value;
    console.log( this.selectedFarePrintOption);
  }
  getBaseFare(){
    if (this.farePrices === undefined)
      return 0;
      if (this.selectedFarePrintOption === '3')
      {
        this.baseFare = this.customFare;
      }
      else
      {
        let adultBaseFare =0; let childBaseFare =0; let infantBaseFare=0
        if (this.farePrices.adultBaseFare !=undefined)
          adultBaseFare=this.farePrices.adultBaseFare;
        if (this.farePrices.childBaseFare !=undefined)
          childBaseFare=this.farePrices.childBaseFare;
        if (this.farePrices.infantBaseFare !=undefined)
          infantBaseFare=this.farePrices.infantBaseFare;          
        this.baseFare = adultBaseFare + childBaseFare+ infantBaseFare;
      }
    
    return this.baseFare;
  }
  getSurchage(){
    if (this.farePrices === undefined)
      return 0;
      let adultFeeAndTax =0; let childFeeAndTax =0; let infantFeeAndTax=0
      if (this.farePrices.adultFeeAndTax !=undefined)
        adultFeeAndTax=this.farePrices.adultFeeAndTax;
      if (this.farePrices.childFeeAndTax !=undefined)
        childFeeAndTax=this.farePrices.childFeeAndTax;
      if (this.farePrices.infantFeeAndTax !=undefined)
        infantFeeAndTax=this.farePrices.infantFeeAndTax;          
      this.fareandTax = adultFeeAndTax + childFeeAndTax + infantFeeAndTax;    
    return  this.fareandTax;
  }
  getTotalFare(){
    if (this.booking === undefined)
      return 0;
    if (this.booking.paymentType == 1 )
    {
      if (this.selectedFarePrintOption === '3')
      {
        this.totalFare = this.customFare + this.fareandTax + 500;
      }
      else
      {
        this.totalFare = this.baseFare + this.fareandTax + 500;
      }
      
    }
    else
    {
      if (this.selectedFarePrintOption === '3')
      {
        this.totalFare = this.customFare + this.fareandTax;
      }
      else
      {
        this.totalFare = this.baseFare + this.fareandTax;
      }
      
    }
    return  this.totalFare;
  }
}
