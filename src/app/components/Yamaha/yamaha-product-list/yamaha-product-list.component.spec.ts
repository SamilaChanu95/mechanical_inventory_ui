import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamahaProductListComponent } from './yamaha-product-list.component';

describe('YamahaProductListComponent', () => {
  let component: YamahaProductListComponent;
  let fixture: ComponentFixture<YamahaProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YamahaProductListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YamahaProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
