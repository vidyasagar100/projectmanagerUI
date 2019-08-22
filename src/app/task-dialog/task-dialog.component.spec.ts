import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatFormFieldModule,MatAutocompleteModule} from '@angular/material';
//import { MatDialogModule,MatAutocompleteModule,MatDividerModule,MatInputModule} from '@angular/material';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      imports: [ReactiveFormsModule, MatFormFieldModule,FormsModule,MatAutocompleteModule]
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
