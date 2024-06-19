import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { MessageService } from 'primeng/api';
import { Observable, catchError, concat, of, throwError } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ToastModule,
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent implements OnInit {
  deliveryForm = this.formBuilder.group({
    package_id: ['', Validators.required],
  });

  creating: boolean = false;
  deliveries$: Observable<Delivery[]> = of([]);
  packages$: Observable<Package[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.deliveries$ = this.apiService.getDeliveries();
  }
  ngOnInit(): void {
    this.deliveries$ = this.apiService.getDeliveries();
    this.packages$ = this.apiService.getPackages();
  }
  onCreateFormSubmitted() {
    this.creating = true;
    this.apiService
      .saveDelivery(this.deliveryForm.value as { package_id: string })
      .pipe(
        catchError((e) => {
          let message = 'Something went wrong';
          console.error(e);
          if (e instanceof HttpErrorResponse && e.error && e.error.message) {
            message = e.error.message;
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
          });

          this.creating = false;
          return throwError(() => e);
        })
      )
      .subscribe((v) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Package created',
        });
        this.deliveryForm.reset();
        this.deliveries$ = concat(of([v as Delivery]), this.deliveries$);
        this.creating = false;
      });
  }
}
