import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStaffComponent } from './add-staff.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AddStaffComponent', () => {
  let component: AddStaffComponent;
  let fixture: ComponentFixture<AddStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffComponent ],
      imports:[StoreModule.forRoot({}), MatDialogModule, HttpClientTestingModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers:[
        FormBuilder,
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
