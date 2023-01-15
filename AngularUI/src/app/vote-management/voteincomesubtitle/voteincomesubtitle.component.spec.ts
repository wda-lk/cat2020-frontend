import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteincomesubtitleComponent } from './voteincomesubtitle.component';

describe('VoteincomesubtitleComponent', () => {
  let component: VoteincomesubtitleComponent;
  let fixture: ComponentFixture<VoteincomesubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteincomesubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteincomesubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
