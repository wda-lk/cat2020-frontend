import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinSessionAdvancedSettingsComponent } from './mixinsessionadvancedsettings.component';

describe('MixinSessionAdvancedSettingsComponent', () => {
  let component: MixinSessionAdvancedSettingsComponent;
  let fixture: ComponentFixture<MixinSessionAdvancedSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinSessionAdvancedSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinSessionAdvancedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
