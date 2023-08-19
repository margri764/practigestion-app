import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryPurchaseComponent } from './user-history-purchase.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';

describe('UserHistoryPurchaseComponent', () => {
  let component: UserHistoryPurchaseComponent;
  let fixture: ComponentFixture<UserHistoryPurchaseComponent>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: new Map<string, string>().set('id', '123'), // Simula los parámetros de ruta que necesites para tus pruebas
    },
    params: of(new Map<string, string>().set('id', '123')), // Simula el observable de parámetros
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHistoryPurchaseComponent ],
      imports: [HttpClientModule, StoreModule.forRoot({}), MaterialModule],
      providers:[
        provideMockStore({ initialState: {} }),  
        {provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHistoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
