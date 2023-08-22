import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockComponent } from './edit-stock.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('EditStockComponent', () => {
  let component: EditStockComponent;
  let fixture: ComponentFixture<EditStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStockComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule  ],
      providers:[
        provideMockStore({ initialState: {} }), 
          
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
