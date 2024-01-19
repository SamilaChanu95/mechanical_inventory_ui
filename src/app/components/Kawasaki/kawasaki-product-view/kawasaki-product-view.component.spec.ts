import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KawasakiProductViewComponent } from './kawasaki-product-view.component';

describe('KawasakiProductViewComponent', () => {
  let component: KawasakiProductViewComponent;
  let fixture: ComponentFixture<KawasakiProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KawasakiProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KawasakiProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
