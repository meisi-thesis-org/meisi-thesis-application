import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderTypographyComponent } from './sub-header-typography.component';

describe('SubHeaderTypographyComponent', () => {
  let component: SubHeaderTypographyComponent;
  let fixture: ComponentFixture<SubHeaderTypographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubHeaderTypographyComponent]
    });
    fixture = TestBed.createComponent(SubHeaderTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
