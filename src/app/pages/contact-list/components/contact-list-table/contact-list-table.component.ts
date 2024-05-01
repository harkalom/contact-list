import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ContactHelperService } from '../../../../core/services/contact-helper.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Contact } from '../../../../shared/models/contact.interface';

@Component({
  selector: 'app-contact-list-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './contact-list-table.component.html',
  styleUrl: './contact-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListTableComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'actions'];

  @Output() openEditModal: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() confirmDeleteModal: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(public contactHelperService: ContactHelperService) {}
}
