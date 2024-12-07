import { TestBed } from '@angular/core/testing';

import { VerifyCodeAPIService } from './verify-code-api.adapter';

describe('VerifyCodeAPIService', () => {
  let service: VerifyCodeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
