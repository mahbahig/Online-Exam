import { TestBed } from '@angular/core/testing';

import { RegisterAPIService } from './register-api.adapter';

describe('RegisterAPIService', () => {
  let service: RegisterAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
