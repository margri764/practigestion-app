import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { SuccessHourlyComponent } from './success-hourly.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessHourlyComponent', () => {
  let component: SuccessHourlyComponent;
  let fixture: ComponentFixture<SuccessHourlyComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessHourlyComponent ],
      imports: [HttpClientTestingModule,StoreModule.forRoot({}), MatDialogModule, MaterialModule],
      providers: [
                {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
                {provide: MatDialogRef, useValue:{}},
                provideMockStore({ initialState: {} }), 
                 ], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
