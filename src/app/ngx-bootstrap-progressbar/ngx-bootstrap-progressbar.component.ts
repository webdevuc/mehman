import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-bootstrap-progressbar',
  templateUrl: './ngx-bootstrap-progressbar.component.html',
  styleUrls: ['./ngx-bootstrap-progressbar.component.scss']
})
export class NgxBootstrapProgressbarComponent {
  normalPB: boolean;    
  stripedPB: boolean;    
  animatedPB: boolean;    
    
  showProgressBar(value){    
    // Value =1 Normal Progress bar    
    // Value =2 Striped Progress bar    
    // Value =3 Animated Progress bar    
    this.normalPB=false;    
    this.stripedPB=false;    
    this.animatedPB=false;    
    
    value ==1 ? this.normalPB=true : value ==2 ?  this.stripedPB=true : this.animatedPB=true;    
      
  }    
}    
