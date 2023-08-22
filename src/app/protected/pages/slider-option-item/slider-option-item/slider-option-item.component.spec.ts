import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderOptionItemComponent } from './slider-option-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { IvyCarouselModule } from 'angular-responsive-carousel2';

describe('SliderOptionItemComponent', () => {
  let component: SliderOptionItemComponent;
  let fixture: ComponentFixture<SliderOptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderOptionItemComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule, IvyCarouselModule ],
      providers:[
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
