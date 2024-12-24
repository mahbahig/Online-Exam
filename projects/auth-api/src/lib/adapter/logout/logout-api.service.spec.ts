import { TestBed } from '@angular/core/testing';

import { LogoutAPIService } from './logout-api.adapter';

describe('LogoutAPIService', () => {
  let service: LogoutAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
