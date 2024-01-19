import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahindraProductViewComponent } from './mahindra-product-view.component';

describe('MahindraProductViewComponent', () => {
  let component: MahindraProductViewComponent;
  let fixture: ComponentFixture<MahindraProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MahindraProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MahindraProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
