import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeQuantityComponent } from './product-type-quantity.component';

describe('ProductTypeQuantityComponent', () => {
  let component: ProductTypeQuantityComponent;
  let fixture: ComponentFixture<ProductTypeQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
