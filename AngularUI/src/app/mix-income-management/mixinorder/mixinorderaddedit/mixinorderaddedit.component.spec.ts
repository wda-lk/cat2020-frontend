import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinOrderAddEditComponent } from './mixinorderaddedit.component';

describe('MixinOrderAddEditComponent', () => {
  let component: MixinOrderAddEditComponent;
  let fixture: ComponentFixture<MixinOrderAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinOrderAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinOrderAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
