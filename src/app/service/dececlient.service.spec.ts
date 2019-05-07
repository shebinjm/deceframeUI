import { TestBed } from '@angular/core/testing';

import { DececlientService } from './dececlient.service';

describe('DececlientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DececlientService = TestBed.get(DececlientService);
    expect(service).toBeTruthy();
  });
});
