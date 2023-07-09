import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanTypographyComponent } from './span-typography.component';

describe('SpanTypographyComponent', () => {
  let component: SpanTypographyComponent;
  let fixture: ComponentFixture<SpanTypographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpanTypographyComponent]
    });
    fixture = TestBed.createComponent(SpanTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
