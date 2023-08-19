import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseAppComponent } from './pause-app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PauseAppComponent', () => {
  let component: PauseAppComponent;
  let fixture: ComponentFixture<PauseAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseAppComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule  ], 
      providers:[
        FormBuilder,
        provideMockStore({ initialState: {} }), 
        {provide: MatDialogRef, useValue: {} },
        
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
