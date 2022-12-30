import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesheettitleComponent } from './balancesheettitle.component';

describe('BalancesheettitleComponent', () => {
  let component: BalancesheettitleComponent;
  let fixture: ComponentFixture<BalancesheettitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancesheettitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancesheettitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
