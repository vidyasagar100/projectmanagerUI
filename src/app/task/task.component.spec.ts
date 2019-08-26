import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatCheckboxModule,MatSliderModule, MatInputModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from './task.services';
import { ProjectService } from '../project/project.services';
import { UserService } from '../user/user.services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatAutocompleteModule, MatDialogModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {name: 'test', id: 123}},TaskService,ProjectService,UserService,
      { 
        provide: ActivatedRoute, 
        useClass: class { navigate = jasmine.createSpy("navigate"); }
    }]

    })
    .compileComponents();
  }));
      //{provide: ActivatedRoute, useValue: {
       // params: Observable.of({id: 123})
     // }

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
