import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningEditHoursComponent } from './opening-edit-hours.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddZero } from 'src/app/protected/pipes/add-zero';
import { MaterialModule } from 'src/app/material/material.module';

describe('OpeningEditHoursComponent', () => {
  let component: OpeningEditHoursComponent;
  let fixture: ComponentFixture<OpeningEditHoursComponent>;
const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningEditHoursComponent, AddZero ],
        imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule  ], 
        providers:[
              provideMockStore({ initialState: {} }), 
              {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
              {provide: MatDialogRef, useValue: {} },
        ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningEditHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
