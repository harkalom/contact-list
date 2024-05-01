import { ChangeDetectionStrategy, Component, Inject, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ContactHelperService } from '../../../core/services/contact-helper.service';
import { Contact } from '../../models/contact.interface';

enum Mode {
  EDIT,
  CREATE
}

@Component({
  selector: 'app-add-new-contact-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-new-contact-modal.component.html',
  styleUrl: './add-new-contact-modal.component.scss'
})
export class AddNewContactModalComponent {
  contactForm!: FormGroup;
  mode: Mode;
  submiButtonText = signal('');

  constructor(
    public dialogRef: MatDialogRef<AddNewContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private _formBuilder: FormBuilder,
    private contactHelperService: ContactHelperService
  ) {
    this.initContactForm(); 
    if (data) {
      this.mode = Mode.EDIT;
      this.submiButtonText.set('Edit Contact');
      this.loadContactToEdit(data);
    } else {
      this.submiButtonText.set('Add Contact');
      this.mode = Mode.CREATE;
    }
  }

  onSubmit(): void {
    if (this.mode === Mode.CREATE) {
      this.contactHelperService.addContact(this.contactForm.value);
      this.dialogRef.close();
    } else {
      this.contactHelperService.updateContact(this.contactForm.value);
      this.dialogRef.close();
    }
  }

  private loadContactToEdit(contact: Contact): void {
    this.contactForm.patchValue(contact);
  }

  private initContactForm(): void {
    this.contactForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      id: [''],
    });
  }
}
