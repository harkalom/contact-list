import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContactFiltersComponent } from './components/contact-filters/contact-filters.component';
import { ContactListTableComponent } from './components/contact-list-table/contact-list-table.component';

import { MatDialog } from '@angular/material/dialog';
import { AddNewContactModalComponent } from '../../shared/modals/add-new-contact-modal/add-new-contact-modal.component';
import { Contact } from '../../shared/models/contact.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactFiltersComponent,
    ContactListTableComponent,
    MatButtonModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent {
  constructor(public dialog: MatDialog) {}

  addNewContact(data?: Contact | null): void {
    this.dialog.open(AddNewContactModalComponent, {
      width: '500px',
      data
    });
  }

  openEditModal(contact: Contact): void {
    this.addNewContact(contact);
  }
}
