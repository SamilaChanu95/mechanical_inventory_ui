import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProductListComponent } from './hero-product-list.component';

describe('HeroProductListComponent', () => {
  let component: HeroProductListComponent;
  let fixture: ComponentFixture<HeroProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
