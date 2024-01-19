import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemarkProductListComponent } from './demark-product-list.component';

describe('DemarkProductListComponent', () => {
  let component: DemarkProductListComponent;
  let fixture: ComponentFixture<DemarkProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemarkProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemarkProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
