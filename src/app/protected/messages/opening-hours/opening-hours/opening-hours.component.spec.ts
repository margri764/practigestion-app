import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursComponent } from './opening-hours.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddZero } from 'src/app/protected/pipes/add-zero';
import { MaterialModule } from 'src/app/material/material.module';

describe('OpeningHoursComponent', () => {
  let component: OpeningHoursComponent;
  let fixture: ComponentFixture<OpeningHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningHoursComponent, AddZero ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule  ],
      providers:[
        provideMockStore({ initialState: {} }), 
        {provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
