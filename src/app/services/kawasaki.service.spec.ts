import { TestBed } from '@angular/core/testing';

import { KawasakiService } from './kawasaki.service';

describe('KawasakiService', () => {
  let service: KawasakiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KawasakiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
