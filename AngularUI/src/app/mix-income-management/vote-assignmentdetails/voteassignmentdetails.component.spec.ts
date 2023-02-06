import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAssignmentDetailsComponent } from './voteassignment.component';

describe('VoteAssignmentDetailsComponent', () => {
  let component: VoteAssignmentDetailsComponent;
  let fixture: ComponentFixture<VoteAssignmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteAssignmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
