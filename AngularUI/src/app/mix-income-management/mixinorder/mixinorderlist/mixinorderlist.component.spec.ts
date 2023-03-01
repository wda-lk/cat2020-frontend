import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinOrderListComponent } from './mixinorderlist.component';

describe('MixinOrderListComponent', () => {
  let component: MixinOrderListComponent;
  let fixture: ComponentFixture<MixinOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
