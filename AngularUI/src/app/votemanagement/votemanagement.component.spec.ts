import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteManagementComponent } from './VoteManagement.component';

describe('VoteManagementComponent', () => {
  let component: VoteManagementComponent;
  let fixture: ComponentFixture<VoteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
