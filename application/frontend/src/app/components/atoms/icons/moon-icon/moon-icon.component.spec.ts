import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonIconComponent } from './moon-icon.component';

describe('MoonIconComponent', () => {
  let component: MoonIconComponent;
  let fixture: ComponentFixture<MoonIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoonIconComponent]
    });
    fixture = TestBed.createComponent(MoonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
