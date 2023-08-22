import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrderComponent } from './status-order.component';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('StatusOrderComponent', () => {
  let component: StatusOrderComponent;
  let fixture: ComponentFixture<StatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOrderComponent ],
      imports: [StoreModule.forRoot({}), MatBottomSheetModule, MatDialogModule, HttpClientTestingModule, MaterialModule],
      providers: [
        provideMockStore({ initialState: {} }), 
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
