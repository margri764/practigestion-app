import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodComponent } from './edit-food.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('EditFoodComponent', () => {
  let component: EditFoodComponent;
  let fixture: ComponentFixture<EditFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodComponent ],
      imports: [MatDialogModule, StoreModule.forRoot({}), HttpClientTestingModule, MaterialModule ],
      providers:[
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
