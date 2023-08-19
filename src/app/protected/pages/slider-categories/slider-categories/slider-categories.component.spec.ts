import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCategoriesComponent } from './slider-categories.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { IvyCarouselModule } from 'angular-responsive-carousel2';

describe('SliderCategoriesComponent', () => {
  let component: SliderCategoriesComponent;
  let fixture: ComponentFixture<SliderCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCategoriesComponent ],
      imports: [StoreModule.forRoot({}), MatDialogModule, MaterialModule, IvyCarouselModule  ],
      providers: [
        provideMockStore({ initialState: {} }),
        ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
