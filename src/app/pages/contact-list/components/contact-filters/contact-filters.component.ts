import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactHelperService } from '../../../../core/services/contact-helper.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-contact-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './contact-filters.component.html',
  styleUrl: './contact-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFiltersComponent implements OnInit {
  contactForm = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public contactHelperService: ContactHelperService
  ) {}

  ngOnInit(): void {
    this.contactForm.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.applyFilter();
      });
  }

  applyFilter(): void {
    const firstNameFilter = (this.contactForm.get('firstName')?.value ?? '')
      .trim()
      .toLowerCase();
    const lastNameFilter = (this.contactForm.get('lastName')?.value ?? '')
      .trim()
      .toLowerCase();
    const phoneFilter = (this.contactForm.get('phone')?.value ?? '')
      .trim()
      .toLowerCase();
      this.contactHelperService.applyFilter(firstNameFilter, lastNameFilter, phoneFilter);
  }
}
