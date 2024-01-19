import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahindraProductListComponent } from './mahindra-product-list.component';

describe('MahindraProductListComponent', () => {
  let component: MahindraProductListComponent;
  let fixture: ComponentFixture<MahindraProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MahindraProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MahindraProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
