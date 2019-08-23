import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../task/task.services';
import { Router } from '@angular/router';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}},TaskService,{ 
        provide: Router, 
        useClass: class { navigate = jasmine.createSpy("navigate"); }
    }]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
