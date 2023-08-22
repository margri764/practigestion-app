import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPriceComponent } from './edit-price.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditPriceComponent', () => {
  let component: EditPriceComponent;
  let fixture: ComponentFixture<EditPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPriceComponent ],
      imports: [ StoreModule.forRoot({}), HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule, ReactiveFormsModule ],
      providers:[
        FormBuilder,
        provideMockStore({ initialState: {} }),  
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
