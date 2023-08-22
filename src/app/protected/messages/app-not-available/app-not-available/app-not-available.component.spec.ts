import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AppNotAvailableComponent } from './app-not-available.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('AppNotAvailableComponent', () => {
  let component: AppNotAvailableComponent;
  let fixture: ComponentFixture<AppNotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNotAvailableComponent ],
      imports: [MatDialogModule, HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers: [
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
