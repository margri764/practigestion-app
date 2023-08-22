import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessHoursComponent } from './success-hours.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessHoursComponent', () => {
  let component: SuccessHoursComponent;
  let fixture: ComponentFixture<SuccessHoursComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessHoursComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule  ], 
      providers: [
        {provide: MatDialogRef, useValue: {} },
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        provideMockStore({ initialState: {} }), 
      ], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
