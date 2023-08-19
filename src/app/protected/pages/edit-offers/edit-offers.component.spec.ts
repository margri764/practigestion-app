import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffersComponent } from './edit-offers.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('EditOffersComponent', () => {
  let component: EditOffersComponent;
  let fixture: ComponentFixture<EditOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOffersComponent ],
       imports:[MatDialogModule, StoreModule.forRoot({}), MaterialModule ],
       providers:[
        provideMockStore({ initialState: {} }), 
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
