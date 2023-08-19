import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { OrderManagmentComponent } from './order-managment.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('OrderManagmentComponent', () => {
  let component: OrderManagmentComponent;
  let fixture: ComponentFixture<OrderManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManagmentComponent ],
      imports: [StoreModule.forRoot({}), MatBottomSheetModule, HttpClientTestingModule, MaterialModule],
      providers: [
        provideMockStore({ initialState: {} }), 
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
