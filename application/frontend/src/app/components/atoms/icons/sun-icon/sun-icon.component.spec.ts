import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunIconComponent } from './sun-icon.component';

describe('SunIconComponent', () => {
  let component: SunIconComponent;
  let fixture: ComponentFixture<SunIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SunIconComponent]
    });
    fixture = TestBed.createComponent(SunIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
