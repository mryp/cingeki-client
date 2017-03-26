import { TestBed, inject } from '@angular/core/testing';

import { StoryinfoService } from './storyinfo.service';

describe('StoryinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryinfoService]
    });
  });

  it('should ...', inject([StoryinfoService], (service: StoryinfoService) => {
    expect(service).toBeTruthy();
  }));
});
