import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStaffComponent } from './success-staff.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessStaffComponent', () => {
  let component: SuccessStaffComponent;
  let fixture: ComponentFixture<SuccessStaffComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SuccessStaffComponent],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { matDialogDataMock } },
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
