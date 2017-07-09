import { MyThirdAppPage } from './app.po';

describe('my-third-app App', () => {
  let page: MyThirdAppPage;

  beforeEach(() => {
    page = new MyThirdAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
