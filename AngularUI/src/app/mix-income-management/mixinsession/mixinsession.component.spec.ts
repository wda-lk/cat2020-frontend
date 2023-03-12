import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinSessionComponent } from './mixinorderlist.component';

describe('MixinSessionComponent', () => {
  let component: MixinSessionComponent;
  let fixture: ComponentFixture<MixinSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixinSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixinSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
