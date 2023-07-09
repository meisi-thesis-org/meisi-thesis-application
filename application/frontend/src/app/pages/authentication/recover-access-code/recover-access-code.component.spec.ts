import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAccessCodeComponent } from './recover-access-code.component';

describe('RecoverAccessCodeComponent', () => {
  let component: RecoverAccessCodeComponent;
  let fixture: ComponentFixture<RecoverAccessCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecoverAccessCodeComponent]
    });
    fixture = TestBed.createComponent(RecoverAccessCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
