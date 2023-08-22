import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsMessageComponent } from './admins-message.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('AdminsMessageComponent', () => {
  let component: AdminsMessageComponent;
  let fixture: ComponentFixture<AdminsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsMessageComponent ],
      imports: [MatDialogModule, MaterialModule],
      providers:[
        {provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
