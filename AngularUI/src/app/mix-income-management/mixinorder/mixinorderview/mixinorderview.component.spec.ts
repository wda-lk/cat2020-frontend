import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinOrderViewComponent } from './mixinorderview.component';

describe('MixinOrderViewComponent', () => {
  let component: MixinOrderViewComponent;
  let fixture: ComponentFixture<MixinOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinOrderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
