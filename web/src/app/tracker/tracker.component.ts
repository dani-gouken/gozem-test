import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    GoogleMapsModule,
    ToastModule,
    InputTextModule,
  ],
  providers: [MessageService],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {
  pickupPinElement: Node | null = new DOMParser().parseFromString(
    `<svg width="48px" class="text-green-800" height="48px" viewBox="-0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-223.000000, -5399.000000)" fill="#000000"><g id="icons" transform="translate(56.000000, 160.000000)">    <path d="M174,5248.219 C172.895,5248.219 172,5247.324 172,5246.219 C172,5245.114 172.895,5244.219 174,5244.219 C175.105,5244.219 176,5245.114 176,5246.219 C176,5247.324 175.105,5248.219 174,5248.219 M174,5239 C170.134,5239 167,5242.134 167,5246 C167,5249.866 174,5259 174,5259 C174,5259 181,5249.866 181,5246 C181,5242.134 177.866,5239 174,5239" id="pin_fill_sharp_circle-[#634]"></path></g></g></g></svg>`,
    'image/svg+xml'
  ).documentElement;
  targetPinElement: Node | null = new DOMParser().parseFromString(
    `<?xml version="1.0" encoding="utf-8"?><svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1C19 0.447715 19.4477 0 20 0C20.5523 0 21 0.447715 21 1V1.58582L22.2709 0.314894C22.6614 -0.0756305 23.2946 -0.0756294 23.6851 0.314895C24.0757 0.705419 24.0757 1.33858 23.6851 1.72911L22.4142 3H23C23.5523 3 24 3.44772 24 4C24 4.55228 23.5523 5 23 5H20.4142L12.7017 12.7125C12.3112 13.103 11.678 13.103 11.2875 12.7125C10.897 12.322 10.897 11.6888 11.2875 11.2983L19 3.58582V1Z" fill="#0F0F0F"/><path d="M17.3924 3.78908C17.834 3.3475 17.7677 2.61075 17.2182 2.31408C15.6655 1.47581 13.8883 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 10.1154 22.5261 8.34153 21.6909 6.79102C21.3946 6.24091 20.6574 6.17424 20.2155 6.61606L20.1856 6.64598C19.8554 6.97615 19.8032 7.48834 20.016 7.90397C20.6451 9.1326 21 10.5249 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4782 3 14.8732 3.35638 16.1037 3.98791C16.5195 4.20129 17.0322 4.14929 17.3627 3.81884L17.3924 3.78908Z" fill="#0F0F0F"/><path d="M14.3899 6.79159C14.8625 6.31902 14.7436 5.52327 14.1062 5.32241C13.4415 5.11295 12.7339 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 11.2702 18.8883 10.5664 18.6811 9.9049C18.4811 9.26659 17.6846 9.14697 17.2117 9.61995L17.1194 9.71224C16.8382 9.99337 16.7595 10.4124 16.8547 10.7984C16.9496 11.1833 17 11.5858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C12.4172 7 12.8225 7.0511 13.21 7.1474C13.5965 7.24347 14.0166 7.16496 14.2982 6.88331L14.3899 6.79159Z" fill="#0F0F0F"/><path d="M11.078 9.15136C11.4874 9.01484 11.6934 9.48809 11.3882 9.79329L10.5827 10.5989C9.80254 11.379 9.80254 12.6438 10.5827 13.4239C11.3628 14.204 12.6276 14.204 13.4077 13.4239L14.2031 12.6285C14.5089 12.3227 14.9822 12.5301 14.8429 12.9397C14.441 14.1209 13.3135 15 12 15C10.3431 15 9 13.6569 9 12C9 10.6796 9.88827 9.54802 11.078 9.15136Z" fill="#0F0F0F"/></svg>`,
    'image/svg+xml'
  ).documentElement;
  currentPosition: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  zoom = 10;
  updating = false;

  items: MenuItem[] | undefined;
  searchForm = this.formBuilder.group({
    package_id: ['', Validators.required],
  });
  package: Package | null = null;
  searching: boolean = false;
  pollPositionTimeout?: any;
  socket = new WebSocket('ws://localhost:3000/ws/updates');

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.items = [
      {
        label: 'Exit',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/']);
        },
      },
    ];

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      if (!this.package || !this.package.active_delivery) {
        return;
      }

      const payload = JSON.parse(event.data);
      console.log(payload);
      if (!payload.event || payload.event != 'delivery_updated') {
        return;
      }

      const updatedDelivery = payload.payload as Delivery;
      if (
        updatedDelivery.delivery_id != this.package.active_delivery.delivery_id
      ) {
        return;
      }

      this.package = {
        ...this.package,
        active_delivery: updatedDelivery,
      };
    });
  }

  search() {
    this.searching = true;
    this.apiService
      .findPackage(this.searchForm.value.package_id!)
      .pipe(
        catchError((e) => {
          let message = 'Something went wrong';
          if (e instanceof HttpErrorResponse) {
            if (e.error && e.error.message) {
              message = e.error.message;
            }
            if (e.status == 404) {
              message = 'Not found';
            }
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
          });

          this.searching = false;
          return throwError(() => e);
        })
      )
      .subscribe((v) => {
        this.package = v;
        this.center = v.from_location;
        this.searching = false;
      });
  }

  get markerPositions() {
    if (this.package == null) {
      return [];
    }
    const positions = [
      {
        position: this.package.from_location,
        title: 'Pickup location',
        options: {},
        content: this.pickupPinElement,
      },
      {
        position: this.package.to_location,
        title: 'Destination',
        options: {},
        content: this.targetPinElement,
      },
    ];
    if (this.package.active_delivery) {
      positions.push({
        position: this.package.active_delivery!.location,
        title: 'Current',
        options: {},
        content: null,
      });
    }
    return positions;
  }

  mapOptions: google.maps.MapOptions = {
    mapId: 'a801374f4b37e6e9',
  };
}
