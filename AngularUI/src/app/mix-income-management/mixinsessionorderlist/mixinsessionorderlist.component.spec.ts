import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinSessionOrderListComponent } from './mixinsessionorderlist.component';

describe('MixinSessionOrderListComponent', () => {
  let component: MixinSessionOrderListComponent;
  let fixture: ComponentFixture<MixinSessionOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinSessionOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinSessionOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
