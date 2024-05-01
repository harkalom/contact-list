import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect } from '@angular/core';
import { ContactHelperService } from '../../core/services/contact-helper.service';
import { Contact } from '../../shared/models/contact.interface';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contact-details',
  standalone: true,
    imports: [MatButtonModule, DatePipe],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {
  contact: Contact | null = null;
  constructor(
    private route: ActivatedRoute,
    public contactHelperService: ContactHelperService,
    private cdr: ChangeDetectorRef
  ) {
    this.initContact();
    effect(() => {
      const a = this.contactHelperService.contactsSource();
      this.initContact();
      this.cdr.detectChanges();
    });
  }

  initContact(): void {
    let contractId = this.route.snapshot.paramMap.get('id');
    if (contractId) {
      this.contact = this.contactHelperService.getContactById(+contractId);
    }
  }
}
