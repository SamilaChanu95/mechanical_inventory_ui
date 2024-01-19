import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuzukiProductViewComponent } from './suzuki-product-view.component';

describe('SuzukiProductViewComponent', () => {
  let component: SuzukiProductViewComponent;
  let fixture: ComponentFixture<SuzukiProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuzukiProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuzukiProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
