import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPausePlayComponent } from './success-pause-play.component';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessPausePlayComponent', () => {
  let component: SuccessPausePlayComponent;
  let fixture: ComponentFixture<SuccessPausePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessPausePlayComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule  ],
      providers:[
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessPausePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
