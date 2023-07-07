import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleIconComponent } from './locale-icon.component';

describe('LocaleIconComponent', () => {
  let component: LocaleIconComponent;
  let fixture: ComponentFixture<LocaleIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocaleIconComponent]
    });
    fixture = TestBed.createComponent(LocaleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
