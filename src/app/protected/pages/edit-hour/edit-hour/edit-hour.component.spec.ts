import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHourComponent } from './edit-hour.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditHourComponent', () => {
  let component: EditHourComponent;
  let fixture: ComponentFixture<EditHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHourComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule, BrowserAnimationsModule  ],
      providers:[
        provideMockStore({ initialState: {}}) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
