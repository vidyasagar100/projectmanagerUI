import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatDividerModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDialog} from '@angular/material';
import { ProjectService } from './project.services';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeDialog } from '../shared/fake-dialog';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, HttpClientTestingModule],
      providers: [ProjectService,{provide: MatDialog, useClass: FakeDialog}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
