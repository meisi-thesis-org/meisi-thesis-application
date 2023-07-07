import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingIconComponent } from './setting-icon.component';

describe('SettingIconComponent', () => {
  let component: SettingIconComponent;
  let fixture: ComponentFixture<SettingIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SettingIconComponent]
    });
    fixture = TestBed.createComponent(SettingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
