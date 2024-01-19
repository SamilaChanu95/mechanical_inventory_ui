import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuzukiProductListComponent } from './suzuki-product-list.component';

describe('SuzukiProductListComponent', () => {
  let component: SuzukiProductListComponent;
  let fixture: ComponentFixture<SuzukiProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuzukiProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuzukiProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
