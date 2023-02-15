import { DatePipe } from '@angular/common';
import { ToasterService } from 'src/app/services/toastr-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TravelAgentService } from './../comman-service/travel-agent.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-travel-agent-add-payment',
  templateUrl: './travel-agent-add-payment.component.html',
  styleUrls: ['./travel-agent-add-payment.component.scss']
})
export class TravelAgentAddPaymentComponent implements OnInit {
  public paymentMethods: Array<{ id: number, key: string, name: string }> = [];
  public mehmanAccounts: Array<{ id: number, name: string, accountNumber: string }> = [];

  public paymentForm: FormGroup;
  public selectedFiles = [];
  public isSubmmited: boolean;
  constructor(private travelAgentService: TravelAgentService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private datePipe: DatePipe,
    private commonService: CommonService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.paymentMethods = this.travelAgentService.getPaymentmethod();
    this.mehmanAccounts = this.travelAgentService.getAccounts();
    this.createForm();
  }

  createForm() {
    this.paymentForm = this.formBuilder.group({
      paymentId: [0],
      paymentMode: ['', [Validators.required]],
      mehmanAccount: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      status: [1],
      verifiedBy: [''],
    })
  }
  get agentUserId(): string {
    return this.authservice.getAgentUserId();
  }
  public onFileSelected(event) {
    this.selectedFiles = event.target.files;
  }

  public addPayment() {
    this.isSubmmited = true;
    // this.paymentForm.value.attachments = this.selectedFiles;
    if (this.paymentForm.invalid) {
      return
    }
    const payload = new FormData();
    // payload.append('name', this.name);
    // payload.append('image', this.selectedFile, this.selectedFile.name);
    payload.append('PaymentId', this.paymentForm.value.paymentId);
    payload.append('PaymentType', this.paymentForm.value.paymentMode);
    payload.append('PaymentAccount', this.paymentForm.value.mehmanAccount);
    payload.append('PaymentDate', this.datePipe.transform(this.paymentForm.value.paymentDate, 'EEEE, MMMM d, y'));
    payload.append('Amount', this.paymentForm.value.amount);
    payload.append('Status', this.paymentForm.value.status);
    payload.append('VerifiedBy', this.paymentForm.value.verifiedBy);
    Array.from(this.selectedFiles).forEach(element => {
      payload.append('File', element, element.name);
    });

    this.travelAgentService.postPaymentDetails(payload).subscribe(response => {
      console.log('response =>', response);
      if (response.status == 'success') {
        this.toasterService.showSuccess(
          'Payment Saved Successfully!',
          'Success'
        );
        this.paymentForm.reset();
        this.paymentForm.updateValueAndValidity();
        //Update Agent balance
        let param = {
          fromDate: null,
          toDate: null,
          userId: this.agentUserId
        }
        this.commonService.UpdateAgentBalance(param);
      }
    }, error => {
      this.toasterService.showError(
        error.title,
        'Error'
      );
      console.log('error =>', error)
    })

  }


}
