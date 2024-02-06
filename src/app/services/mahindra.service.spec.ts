import { TestBed } from '@angular/core/testing';

import { MahindraService } from './mahindra.service';

describe('MahindraService', () => {
  let service: MahindraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MahindraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
