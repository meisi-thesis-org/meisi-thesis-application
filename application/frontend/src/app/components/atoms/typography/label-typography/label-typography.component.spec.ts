import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTypographyComponent } from './label-typography.component';

describe('LabelTypographyComponent', () => {
  let component: LabelTypographyComponent;
  let fixture: ComponentFixture<LabelTypographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelTypographyComponent]
    });
    fixture = TestBed.createComponent(LabelTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
