import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from './../../services/toastr-service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RefundType, RequestType, TravelAgentService } from '../comman-service/travel-agent.service';

@Component({
  selector: 'app-apply-refunds-and-voids',
  templateUrl: './apply-refunds-and-voids.component.html',
  styleUrls: ['./apply-refunds-and-voids.component.scss'],
  providers: [TitleCasePipe]
})
export class ApplyRefundsAndVoidsComponent implements OnInit {
  @ViewChild('refundNgForm') refundNgForm: NgForm;

  public requestTypeList: Array<RequestType> = [];
  public refundTypeList: Array<RefundType> = [];
  public airLinesList = [];

  public refundForm: FormGroup;
  public isSubmmited: boolean;
  public readonly: boolean;
  public refundId: any;

  constructor(private travelAgentService: TravelAgentService, private formBuilder: FormBuilder, private toasterService: ToasterService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAirLines();
    this.requestTypeList = this.travelAgentService.getRequestType();
    this.refundTypeList = this.travelAgentService.getRefundType();
    this.createForm();

    this.routeSubscribe();
  }

  createForm() {
    this.refundForm = this.formBuilder.group({
      refundId: [''],
      isActive: [false],
      requestType: ['refund', [Validators.required]],
      airLine: ['', [Validators.required]],
      pnr: ['', [Validators.required]],
      route: ['', [Validators.required]],
      travelDate: [new Date(), [Validators.required]],
      refundType: [''],
      passenger: this.formBuilder.array([this.createPassenger()]),
      remarks: [''],
      isChecked: [false, [Validators.required]]
    });
  }

  getAirLines() {
    this.travelAgentService.getAirlines().subscribe(response => {
      if (response.status == "success") {
        this.airLinesList = response.data;
      }
    }, error => { });
  }

  public getPassengerArray() {
    return this.refundForm.get('passenger') as FormArray;
  }

  private createPassenger(): FormGroup {
    return new FormGroup({
      passangerTicketNumber: new FormControl('', [Validators.required]),
      passangerName: new FormControl('', [Validators.required])
    });
  }

  public addPassenger(): void {
    const passenger = this.getPassengerArray();
    passenger.push(this.createPassenger());
  }

  public deletePassengerItem(index) {
    let pasangerItems = this.getPassengerArray();
    pasangerItems.removeAt(index);
  }


  routeSubscribe() {
    let type, id;
    this.route.paramMap.subscribe(paramMap => {
      type = paramMap.get('type');
      this.refundId = paramMap.get('id');
      console.log(this.refundId)
      if (this.refundId) {
        this.getRefundById(this.refundId);
      }

    });
    if (type == 'view') {
      this.refundForm.disable();
      this.readonly = true;
    }
  }

  public saveDetails() {
    this.isSubmmited = true;
    if (this.refundForm.invalid) {
      return
    }
    let param = this.refundForm.value;
    delete param.isChecked;
    if (!this.refundId) {
      param.refundId = 0;
      this.postDetails(param);
    } else {
      param.refundId = Number(this.refundId);
      this.putDetails(param);
    }

  }

  getRefundById(id) {
    this.travelAgentService.getRefundById(id).subscribe(response => {
      if (response.status == "success") {
        console.log(response.data[0])
        this.patchValues(response.data[0]);
        console.log(response.data[0])
      }
    }, error => {
      this.toasterService.showError(
        'GetRefunds Err 1: Unknown; Try Again',
        'Error'
      );
    })
  }



  patchValues(data: { [key: string]: any }, { onlySelf, emitEvent }: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
    this.refundForm.setControl('passenger', this.setExistingCommetns(data.passenger));
    this.refundForm.controls['isChecked'].patchValue(true);
    Object.keys(data).forEach(name => {
      console.log(name);
      if (this.refundForm.controls[name]) {
        this.refundForm.controls[name].patchValue(data[name], { onlySelf: true, emitEvent });
      }
    });
    this.refundForm.setControl('passenger', this.setExistingCommetns(data.passenger));
    this.refundForm.updateValueAndValidity({ onlySelf, emitEvent });
  }


  setExistingCommetns(passenger): FormArray {
    const formArray = new FormArray([]);
    passenger.forEach(element => {
      formArray.push(this.formBuilder.group({
        passangerTicketNumber: element.passangerTicketNumber,
        passangerName: element.passangerName
      }));
    });
    return formArray;
  }

  public getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate());

    return previous;
  }

  public addRemoveValidation() {
    if (this.refundForm.get('requestType').value == 'refund') {
      this.refundForm.get('refundType').validator = <any>Validators.compose([Validators.required]);
    } else {
      this.refundForm.get('refundType').clearValidators();
      this.refundForm.get('refundType').setValue('');
    }
    this.refundForm.get('refundType').updateValueAndValidity();
  }

  postDetails(param) {
    this.travelAgentService.postRefundDetails(param).subscribe(response => {
      if (response.status == 'success') {
        this.toasterService.showSuccess(
          response.message,
          'Congratulations!'
        );        
      } else {
        this.popupErrorAlert();
      }
    }, error => {
      this.popupErrorAlert();
    });
  }

  putDetails(param) {
    console.log('param', param)
    this.travelAgentService.putRefundDetails(param).subscribe(response => {
      if (response.status == 'success') {
        this.toasterService.showSuccess(
          response.message,
          'Congratulations!'
        );        
      } else {
        this.popupErrorAlert();
      }
    }, error => {
      this.popupErrorAlert();
    });
  }


  popupErrorAlert() {
    this.toasterService.showError(
      'GetRefunds Err 1: Unknown; Try Again',
      'Error'
    );
  }

}

