import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTypographyComponent } from './brand-typography.component';

describe('BrandTypographyComponent', () => {
  let component: BrandTypographyComponent;
  let fixture: ComponentFixture<BrandTypographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrandTypographyComponent]
    });
    fixture = TestBed.createComponent(BrandTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
