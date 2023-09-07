import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AskCategoryComponent } from './ask-category.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('AskCategoryComponent', () => {
  let component: AskCategoryComponent;
  let fixture: ComponentFixture<AskCategoryComponent>;
  const matDialogDataMock = 'fries';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskCategoryComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers:[
        {provide: MatDialogRef, useValue: {} },
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
