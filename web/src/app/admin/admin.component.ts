import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Packages',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/admin/package']);
        },
      },
      {
        label: 'Deliveries',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/admin/delivery']);
        },
      },
      {
        label: 'Exit',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/']);
        },
      },
    ];
  }
}
