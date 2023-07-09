import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphTypographyComponent } from './paragraph-typography.component';

describe('ParagraphTypographyComponent', () => {
  let component: ParagraphTypographyComponent;
  let fixture: ComponentFixture<ParagraphTypographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParagraphTypographyComponent]
    });
    fixture = TestBed.createComponent(ParagraphTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
