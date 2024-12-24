import { TestBed } from '@angular/core/testing';

import { SubjectAPIService } from './subject-api.adapter';

describe('SubjectAPIService', () => {
  let service: SubjectAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
