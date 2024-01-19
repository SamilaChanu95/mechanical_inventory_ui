import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsProductListComponent } from './tvs-product-list.component';

describe('TvsProductListComponent', () => {
  let component: TvsProductListComponent;
  let fixture: ComponentFixture<TvsProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvsProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvsProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
