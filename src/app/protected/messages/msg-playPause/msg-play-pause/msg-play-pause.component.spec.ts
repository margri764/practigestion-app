import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgPlayPauseComponent } from './msg-play-pause.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('MsgPlayPauseComponent', () => {
  let component: MsgPlayPauseComponent;
  let fixture: ComponentFixture<MsgPlayPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgPlayPauseComponent ],
      imports: [MaterialModule], 
      providers: [
        {provide: MatDialogRef, useValue: {} },
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgPlayPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
