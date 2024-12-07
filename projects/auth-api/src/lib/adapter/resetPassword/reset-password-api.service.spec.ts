import { TestBed } from '@angular/core/testing';

import { ResetPasswordAPIService } from './reset-password-api.adapter';

describe('ResetPasswordAPIService', () => {
  let service: ResetPasswordAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
