import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBindingComponent } from './book-binding.component';

describe('BookBindingComponent', () => {
  let component: BookBindingComponent;
  let fixture: ComponentFixture<BookBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
