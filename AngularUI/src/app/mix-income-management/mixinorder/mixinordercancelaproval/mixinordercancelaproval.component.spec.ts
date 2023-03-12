import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinOrderCancelAprovalComponent } from './mixinordercancelaproval.component';

describe('MixinOrderCancelAprovalComponent', () => {
  let component: MixinOrderCancelAprovalComponent;
  let fixture: ComponentFixture<MixinOrderCancelAprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinOrderCancelAprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinOrderCancelAprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
