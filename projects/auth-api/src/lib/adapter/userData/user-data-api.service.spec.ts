import { TestBed } from '@angular/core/testing';

import { UserDataAPIService } from './user-data-api.adapter';

describe('UserDataAPIService', () => {
  let service: UserDataAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
