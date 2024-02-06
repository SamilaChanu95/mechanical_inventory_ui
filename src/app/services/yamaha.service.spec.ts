import { TestBed } from '@angular/core/testing';

import { YamahaService } from './yamaha.service';

describe('YamahaService', () => {
  let service: YamahaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YamahaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
