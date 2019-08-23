import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatFormFieldModule,MatAutocompleteModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../task/task.services';
//import { MatDialogModule,MatAutocompleteModule,MatDividerModule,MatInputModule} from '@angular/material';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [TaskService, { provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}}]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
