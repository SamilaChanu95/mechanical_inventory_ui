import { TestBed } from '@angular/core/testing';

import { HondaService } from './honda.service';

describe('HondaService', () => {
  let service: HondaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HondaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
