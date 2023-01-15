import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedetailComponent } from './votedetail.component';

describe('VotedetailComponent', () => {
  let component: VotedetailComponent;
  let fixture: ComponentFixture<VotedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
