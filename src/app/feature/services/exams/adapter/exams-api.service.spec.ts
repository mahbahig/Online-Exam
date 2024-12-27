import { TestBed } from '@angular/core/testing';

import { ExamsAPIService } from './exams-api.adapter';

describe('ExamsAPIService', () => {
  let service: ExamsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
