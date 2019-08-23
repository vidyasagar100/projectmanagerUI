import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {MatFormFieldModule, MatDividerModule, MatDialog} from '@angular/material';

import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.services';
import { of, Observable } from 'rxjs';

class FakeDialog {}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ReactiveFormsModule,  MatFormFieldModule, MatDividerModule, HttpClientTestingModule],
      providers: [
        UserService,
        {provide: MatDialog, useClass: FakeDialog }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear Form',() => {
    fixture.detectChanges();

    component.userForm.setValue({userId: 123 , firstName: 'firstName',lastName: 'lastName',employeeId: 101});
    component.clear();

    expect(component.userForm.get('firstName').value).toBe('');
    expect(component.userForm.get('lastName').value).toBe('');
    expect(component.userForm.get('employeeId').value).toBe('');
  });

  it('should load all users', () => {

    const users = [{firstName: 'first', lastName: 'last'}];
    spyOn(userService, 'getUsers').and.callFake(() => of(users));

    fixture.detectChanges();

    expect(component.userList.length).toBe(1);

  });
});
