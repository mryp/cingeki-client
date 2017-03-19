import { CingekiClientPage } from './app.po';

describe('cingeki-client App', () => {
  let page: CingekiClientPage;

  beforeEach(() => {
    page = new CingekiClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
