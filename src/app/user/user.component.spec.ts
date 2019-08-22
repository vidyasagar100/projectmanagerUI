import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule, MatDividerModule} from '@angular/material';

import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ReactiveFormsModule,  MatFormFieldModule, MatDividerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
