import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DriverComponent } from './driver/driver.component';
import { PackageComponent } from './admin/package/package.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/package',
        pathMatch: 'full',
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
      },
      {
        path: 'package',
        component: PackageComponent,
      },
    ],
  },
  {
    path: 'tracker',
    component: TrackerComponent,
  },
  {
    path: 'driver',
    component: DriverComponent,
  },
];
