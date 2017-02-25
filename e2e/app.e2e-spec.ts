import { ShAppPage } from './app.po';

describe('sh-app App', () => {
    let page: ShAppPage;

    beforeEach(() => {
        page = new ShAppPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
