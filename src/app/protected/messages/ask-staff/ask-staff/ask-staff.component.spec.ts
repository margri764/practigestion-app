import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskStaffComponent } from './ask-staff.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MaterialModule } from 'src/app/material/material.module';

describe('AskStaffComponent', () => {
  let component: AskStaffComponent;
  let fixture: ComponentFixture<AskStaffComponent>;
  const matDialogDataMock = 'fries';
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskStaffComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatBottomSheetModule, MatDialogModule, MaterialModule],
      providers:[
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
