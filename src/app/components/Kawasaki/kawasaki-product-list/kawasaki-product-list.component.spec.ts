import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KawasakiProductListComponent } from './kawasaki-product-list.component';

describe('KawasakiProductListComponent', () => {
  let component: KawasakiProductListComponent;
  let fixture: ComponentFixture<KawasakiProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KawasakiProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KawasakiProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
