import { TestBed } from '@angular/core/testing';

import { KtmService } from './ktm.service';

describe('KtmService', () => {
  let service: KtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
