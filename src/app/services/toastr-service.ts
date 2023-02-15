import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private toastrService: ToastrService) {}

  display(value: boolean) {
    this.status.next(value);
  }

  showSuccess(message: any, title: any) {
    this.toastrService.success(message, title, {
      progressBar: true,
      newestOnTop: true,
      enableHtml: true,
    });
  }

  showInfo(message: any, title: any) {
    this.toastrService.info(message, title, {
      progressBar: true,
      newestOnTop: true,
      enableHtml: true,
    });
  }

  showError(message: any, title: any) {
    this.toastrService.error(message, title, {
      progressBar: true,
      newestOnTop: true,
      enableHtml: true,
    });
  }

  showWarning(message: any, title: any) {
    this.toastrService.warning(message, title, {
      progressBar: true,
      newestOnTop: true,
      enableHtml: true,
    });
  }
}
