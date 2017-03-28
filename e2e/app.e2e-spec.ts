import { VisitUiPage } from './app.po';

describe('visit-ui App', () => {
  let page: VisitUiPage;

  beforeEach(() => {
    page = new VisitUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
