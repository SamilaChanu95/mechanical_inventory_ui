import { TestBed } from '@angular/core/testing';

import { SuzukiService } from './suzuki.service';

describe('SuzukiService', () => {
  let service: SuzukiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuzukiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
