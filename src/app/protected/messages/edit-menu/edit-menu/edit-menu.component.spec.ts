import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMenuComponent } from './edit-menu.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DecimalRound } from 'src/app/protected/pipes/decimal-round';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditMenuComponent', () => {
  let component: EditMenuComponent;
  let fixture: ComponentFixture<EditMenuComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuComponent, DecimalRound  ],
      imports:[StoreModule.forRoot({}), HttpClientTestingModule, MatDialogModule, MatBottomSheetModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule ],
      providers:[
        FormBuilder,
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }),
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
