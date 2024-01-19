import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaProductViewComponent } from './honda-product-view.component';

describe('HondaProductViewComponent', () => {
  let component: HondaProductViewComponent;
  let fixture: ComponentFixture<HondaProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HondaProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
