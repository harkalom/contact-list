import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListTableComponent } from './contact-list-table.component';

describe('ContactListTableComponent', () => {
  let component: ContactListTableComponent;
  let fixture: ComponentFixture<ContactListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
