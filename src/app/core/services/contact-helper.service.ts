import { Injectable, WritableSignal, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Contact } from '../../shared/models/contact.interface';
import { ConfirmModalComponent } from '../../shared/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewContactModalComponent } from '../../shared/modals/add-new-contact-modal/add-new-contact-modal.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactHelperService {
  contactsSource: WritableSignal<Contact[]> = signal([]);

  private storageKey = 'contacts';

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.contactsSource.set(this.getContacts());
  }

  getContacts(): Contact[] {
    const storedContacts = this.localStorageService.getItem<Contact[]>(this.storageKey);
    return storedContacts ?? this.initDefaultContacts();
  }

  getContactById(contactId: number): Contact | null {
    const contacts = this.localStorageService.getItem<Contact[]>(this.storageKey);
    if (!contacts) {
      return null;
    }
    const contact = contacts.find(contact => contact.id === contactId);

    if (!contact) {
      return null;
    }

    return contact;
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();;
    contact.id = this.generateId();
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts();
    const contactIndex = contacts.findIndex(c => c.id === updatedContact.id);
    if (contactIndex !== -1) {
      contacts[contactIndex] = updatedContact;
      this.saveContacts(contacts);
    }
  }

  confirmDeleteModal(contact: Contact, redirectTo?: string): void {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'Confirm delete',
        description: `Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`
      }
    });

    dialog.afterClosed()
    .subscribe(res => {
      if (!res) {
        return;
      }
      this.deleteContact(contact.id);
      if(redirectTo) {
        this.router.navigate([redirectTo]);
      }  
    })
  }

  addEditNewContact(data?: Contact | null): void {
    this.dialog.open(AddNewContactModalComponent, {
      width: '500px',
      data
    });
  }
  
  deleteContact(contactId: number): void {
    const contacts = this.getContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    this.saveContacts(updatedContacts);
  }

  applyFilter(firstNameFilter: string, lastNameFilter: string, phoneFilter: string): void {
    const contacts = this.getContacts();
    const filteredData = contacts.filter((item) => {
      const firstNameMatch = item.firstName
        .toLowerCase()
        .includes(firstNameFilter);
      const lastNameMatch = item.lastName
        .toLowerCase()
        .includes(lastNameFilter);
      const phoneMatch = item.phone.toLowerCase().includes(phoneFilter);

      return firstNameMatch && lastNameMatch && phoneMatch;
    });
     this.contactsSource.set(filteredData);
  }

  private initDefaultContacts(): Contact[] {
    const defaultContacts = [
      {"id": 1, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan@example.com", "address": "123 Main St"},
      {"id": 2, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro3@example.com", "address": "456 Elm St"},
      {"id": 3, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan2@example.com", "address": "123 Main St"},
      {"id": 4, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro4@example.com", "address": "456 Elm St"},
      {"id": 5, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan3@example.com", "address": "123 Main St"},
      {"id": 6, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro5@example.com", "address": "456 Elm St"},
      {"id": 7, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan4@example.com", "address": "123 Main St"},
      {"id": 8, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro6@example.com", "address": "456 Elm St"},
      {"id": 9, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan5@example.com", "address": "123 Main St"},
      {"id": 10, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro7@example.com", "address": "456 Elm St"},
      {"id": 11, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan6@example.com", "address": "123 Main St"},
      {"id": 12, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan7@example.com", "address": "123 Main St"},
      {"id": 13, "firstName": "Petro", "lastName": "Petrenko", "phone": "0987654321", "birthDate": new Date(), "email": "petro8@example.com", "address": "456 Elm St"},
      {"id": 14, "firstName": "Ivan", "lastName": "Ivanenko", "phone": "1234567890", "birthDate": new Date(), "email": "ivan8@example.com", "address": "123 Main St"},
    ];
    
  
    this.saveContacts(defaultContacts);
    return defaultContacts;
  }

  private saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    this.contactsSource.set(contacts);
  }

  private generateId(): number {
    const contacts = this.getContacts();
    return contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  }
}
