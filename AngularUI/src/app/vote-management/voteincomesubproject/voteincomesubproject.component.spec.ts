import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteincomesubprojectComponent } from './voteincomesubproject.component';

describe('VoteincomesubprojectComponent', () => {
  let component: VoteincomesubprojectComponent;
  let fixture: ComponentFixture<VoteincomesubprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteincomesubprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteincomesubprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
