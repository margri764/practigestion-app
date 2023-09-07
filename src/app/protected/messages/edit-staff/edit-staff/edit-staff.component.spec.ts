// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditStaffComponent } from './edit-staff.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { provideMockStore } from '@ngrx/store/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MaterialModule } from 'src/app/material/material.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('EditStaffComponent', () => {
//   let component: EditStaffComponent;
//   let fixture: ComponentFixture<EditStaffComponent>;
//   const matDialogDataMock = 'fries';
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ EditStaffComponent ],
//       imports:[StoreModule.forRoot({}),  HttpClientTestingModule, MatDialogModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule ],
//       providers:[
//         FormBuilder,
//         provideMockStore({ initialState: {} }),  
//         {provide: MatDialogRef, useValue: {} },
//         {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
       
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(EditStaffComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
