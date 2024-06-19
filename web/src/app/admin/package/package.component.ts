import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Observable, catchError, concat, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    TableModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css',
})
export class PackageComponent implements OnInit {
  packageForm = this.formBuilder.group({
    weight: [0, Validators.required],
    width: [0, Validators.required],
    depth: [0, Validators.required],
    description: ['', Validators.required],
    from_name: ['', Validators.required],
    from_address: ['', Validators.required],
    from_location: this.formBuilder.group({
      lat: [0, Validators.required],
      lng: [0, Validators.required],
    }),
    to_name: ['', Validators.required],
    to_address: ['', Validators.required],
    to_location: this.formBuilder.group({
      lat: [0, Validators.required],
      lng: [0, Validators.required],
    }),
  });

  creating: boolean = false;
  packages$: Observable<Package[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private packageService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.packages$ = this.packageService.getPackages();
  }

  onCreateFormSubmitted() {
    this.creating = true;
    this.packageService
      .savePackage(this.packageForm.value as Package)
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
        this.packageForm.reset();
        this.packages$ = concat(of([v as Package]), this.packages$);
        this.creating = false;
      });
  }
}
