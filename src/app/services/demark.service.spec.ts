import { TestBed } from '@angular/core/testing';

import { DemarkService } from './demark.service';

describe('DemarkService', () => {
  let service: DemarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
