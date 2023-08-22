import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalOrdersComponent } from './historical-orders.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HistoricalOrdersComponent', () => {
  let component: HistoricalOrdersComponent;
  let fixture: ComponentFixture<HistoricalOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalOrdersComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule  ],
      providers:[
        FormBuilder,
        provideMockStore({ initialState: {} }),      
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
