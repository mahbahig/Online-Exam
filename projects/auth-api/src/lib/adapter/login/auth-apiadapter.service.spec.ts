import { TestBed } from '@angular/core/testing';

import { AuthAPIAdapterService } from './login-api.adapter';

describe('AuthAPIAdapterService', () => {
  let service: AuthAPIAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAPIAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
