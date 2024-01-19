import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemarkProductViewComponent } from './demark-product-view.component';

describe('DemarkProductViewComponent', () => {
  let component: DemarkProductViewComponent;
  let fixture: ComponentFixture<DemarkProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemarkProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemarkProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
