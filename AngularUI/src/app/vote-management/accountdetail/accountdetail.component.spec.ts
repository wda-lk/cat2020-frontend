import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetailComponent } from './accountdetail.component';

describe('AccountdetailComponent', () => {
  let component: AccountdetailComponent;
  let fixture: ComponentFixture<AccountdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
