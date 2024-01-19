import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtmProductViewComponent } from './ktm-product-view.component';

describe('KtmProductViewComponent', () => {
  let component: KtmProductViewComponent;
  let fixture: ComponentFixture<KtmProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KtmProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KtmProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
