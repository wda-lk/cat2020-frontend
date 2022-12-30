import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteincometitleComponent } from './voteincometitle.component';

describe('VoteincometitleComponent', () => {
  let component: VoteincometitleComponent;
  let fixture: ComponentFixture<VoteincometitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteincometitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteincometitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
