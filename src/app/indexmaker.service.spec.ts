import { TestBed, inject } from '@angular/core/testing';

import { IndexmakerService } from './indexmaker.service';

describe('IndexmakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexmakerService]
    });
  });

  it('should ...', inject([IndexmakerService], (service: IndexmakerService) => {
    expect(service).toBeTruthy();
  }));
});
