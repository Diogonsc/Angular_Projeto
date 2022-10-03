/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessResultService } from './processResultService.service';

describe('Service: ProcessResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessResultService]
    });
  });

  it('should ...', inject([ProcessResultService], (service: ProcessResultService) => {
    expect(service).toBeTruthy();
  }));
});
