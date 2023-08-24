import { TestBed } from '@angular/core/testing';

import { CharaterService } from './charater.service';

describe('CharaterService', () => {
  let service: CharaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
