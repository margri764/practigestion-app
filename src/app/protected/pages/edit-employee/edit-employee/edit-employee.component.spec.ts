import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmployeeComponent } from './edit-employee.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';


describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule], 
      providers:[provideMockStore({ initialState: {} }), ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
