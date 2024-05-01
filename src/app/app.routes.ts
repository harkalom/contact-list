import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contact-list',
    loadComponent: () =>
      import('./pages/contact-list/contact-list.component').then(
        (m) => m.ContactListComponent
      ),
  },
  {
    path: 'contact-list/:id',
    loadComponent: () =>
      import('./pages/contact-details/contact-details.component').then(
        (m) => m.ContactDetailsComponent
      ),
  },
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
];
