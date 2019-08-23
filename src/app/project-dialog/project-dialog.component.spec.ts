import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogComponent } from './project-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from '../project/project.services';

describe('ProjectDialogComponent', () => {
  let component: ProjectDialogComponent;
  let fixture: ComponentFixture<ProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ProjectService, { provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}}]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
