import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteincomeprojectComponent } from './voteincomeproject.component';

describe('VoteincomeprojectComponent', () => {
  let component: VoteincomeprojectComponent;
  let fixture: ComponentFixture<VoteincomeprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteincomeprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteincomeprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
