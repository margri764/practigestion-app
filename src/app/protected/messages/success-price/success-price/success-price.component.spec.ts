import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPriceComponent } from './success-price.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessPriceComponent', () => {
  let component: SuccessPriceComponent;
  let fixture: ComponentFixture<SuccessPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessPriceComponent ],
      imports: [MaterialModule], 
      providers: [
        {provide: MatDialogRef, useValue: {} },
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
