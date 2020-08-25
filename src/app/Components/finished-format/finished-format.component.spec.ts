import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedFormatComponent } from './finished-format.component';

describe('FinishedFormatComponent', () => {
  let component: FinishedFormatComponent;
  let fixture: ComponentFixture<FinishedFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
