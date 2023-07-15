import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyButtonComponent } from './typography-button.component';

describe('TypographyButtonComponent', () => {
  let component: TypographyButtonComponent;
  let fixture: ComponentFixture<TypographyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TypographyButtonComponent]
    });
    fixture = TestBed.createComponent(TypographyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
