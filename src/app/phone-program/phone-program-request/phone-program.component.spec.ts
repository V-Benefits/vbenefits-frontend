import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneProgramComponent } from './phone-program.component';

describe('PhoneProgramComponent', () => {
  let component: PhoneProgramComponent;
  let fixture: ComponentFixture<PhoneProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
