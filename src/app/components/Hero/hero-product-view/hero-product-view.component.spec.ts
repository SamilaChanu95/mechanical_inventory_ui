import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProductViewComponent } from './hero-product-view.component';

describe('HeroProductViewComponent', () => {
  let component: HeroProductViewComponent;
  let fixture: ComponentFixture<HeroProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
