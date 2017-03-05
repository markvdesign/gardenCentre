import { GardenCenterPage } from './app.po';

describe('garden-center App', () => {
  let page: GardenCenterPage;

  beforeEach(() => {
    page = new GardenCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gc works!');
  });
});
