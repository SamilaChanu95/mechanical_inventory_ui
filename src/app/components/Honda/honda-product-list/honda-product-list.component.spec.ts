import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaProductListComponent } from './honda-product-list.component';

describe('HondaProductListComponent', () => {
  let component: HondaProductListComponent;
  let fixture: ComponentFixture<HondaProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HondaProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
