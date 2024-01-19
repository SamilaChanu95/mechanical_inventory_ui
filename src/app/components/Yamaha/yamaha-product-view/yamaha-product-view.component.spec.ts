import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamahaProductViewComponent } from './yamaha-product-view.component';

describe('YamahaProductViewComponent', () => {
  let component: YamahaProductViewComponent;
  let fixture: ComponentFixture<YamahaProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YamahaProductViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YamahaProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
