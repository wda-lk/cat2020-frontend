import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteallocationComponent } from './voteallocation.component';

describe('VoteallocationComponent', () => {
  let component: VoteallocationComponent;
  let fixture: ComponentFixture<VoteallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteallocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
