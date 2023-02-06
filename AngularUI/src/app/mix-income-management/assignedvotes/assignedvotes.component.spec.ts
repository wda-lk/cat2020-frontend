import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedVotesComponent } from './assignedvotes.component';

describe('AssignedVotesComponent', () => {
  let component: AssignedVotesComponent;
  let fixture: ComponentFixture<AssignedVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedVotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
