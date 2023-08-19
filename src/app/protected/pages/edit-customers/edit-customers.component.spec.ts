import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomersComponent } from './edit-customers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditCustomersComponent', () => {
  let component: EditCustomersComponent;
  let fixture: ComponentFixture<EditCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomersComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule, FormsModule, BrowserAnimationsModule   ],
      providers:[
        {provide: MatDialogRef, useValue: {} },
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
