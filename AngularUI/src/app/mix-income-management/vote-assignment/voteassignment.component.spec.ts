import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAssignmentComponent } from './voteassignment.component';

describe('VoteAssignmentComponent', () => {
  let component: VoteAssignmentComponent;
  let fixture: ComponentFixture<VoteAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
