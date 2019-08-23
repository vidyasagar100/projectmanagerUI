import * as testing from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule, MatInputModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FakeDialogRef } from '../fake-dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: testing.ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(testing.async(() => {
    testing.TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [MatDialogModule, MatInputModule],
      providers: [{ provide: MatDialogRef, useClass: FakeDialogRef },{provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}}]
   //   providers: [ProjectService,{provide: MatDialog, useClass: FakeDialog}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = testing.TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
