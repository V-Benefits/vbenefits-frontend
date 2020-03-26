import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneProgramModalComponent } from './phone-program-modal.component';

describe('PhoneProgramModalComponent', () => {
  let component: PhoneProgramModalComponent;
  let fixture: ComponentFixture<PhoneProgramModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneProgramModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneProgramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
