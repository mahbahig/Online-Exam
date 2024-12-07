import { TestBed } from '@angular/core/testing';

import { VerifyEmailAPIService } from './verify-email-api.adapter';

describe('VerifyEmailAPIService', () => {
  let service: VerifyEmailAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyEmailAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
