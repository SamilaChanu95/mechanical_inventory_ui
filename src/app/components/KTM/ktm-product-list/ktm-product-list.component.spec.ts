import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtmProductListComponent } from './ktm-product-list.component';

describe('KtmProductListComponent', () => {
  let component: KtmProductListComponent;
  let fixture: ComponentFixture<KtmProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KtmProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KtmProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
