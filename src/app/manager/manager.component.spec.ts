import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerComponent } from './manager.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from '../project/project.services';
import { FakeDialogRef } from '../shared/fake-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ProjectService, { provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
