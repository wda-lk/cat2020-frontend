import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountbalancedetailComponent } from './accountbalancedetail.component';

describe('AccountbalancedetailComponent', () => {
  let component: AccountbalancedetailComponent;
  let fixture: ComponentFixture<AccountbalancedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountbalancedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountbalancedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
