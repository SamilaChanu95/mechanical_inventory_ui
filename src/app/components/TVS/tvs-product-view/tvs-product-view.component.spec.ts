import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsProductViewComponent } from './tvs-product-view.component';

describe('TvsProductViewComponent', () => {
  let component: TvsProductViewComponent;
  let fixture: ComponentFixture<TvsProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvsProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvsProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
