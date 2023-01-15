import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesheetsubtitleComponent } from './balancesheetsubtitle.component';

describe('BalancesheetsubtitleComponent', () => {
  let component: BalancesheetsubtitleComponent;
  let fixture: ComponentFixture<BalancesheetsubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancesheetsubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancesheetsubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
