const puppeteer = require('puppeteer');

class Browser {
    constructor(height, width, url) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init(height, width, url);
    }

    async init(height, width, url) {
        await puppeteer.launch().then((browser) => {
            this.browser = browser;
            browser.newPage().then((page) => {
                this.page = page;
                this.page.setViewport({
                    width: width,
                    height: height,
                });
                this.page.goto(url);
            });
        });
    }

    // GEt height and width of headless browser
    getViewport() {
        return this.page.viewport();
    };

    // Set height and width of headless browser
    async setViewport(height, width) {
        return this.page.setViewport({
            width: width,
            height: height,
        });
    }

    // Get url of headless browser
    getUrl() {
        return this.page.url();
    }

    // Set url of headless browser
    async setUrl(url) {
        return this.page.goto(url).then((data) => {
            return data.status();
        }).catch((err) => {
            return 500;
        })
    }

    // Returns buffer data of screenshot as a promise
    async screenshot() {
        return this.page.screenshot({ type: 'png' });
    }

    // Set the mouse position within headless browser
    async setMousePosition(x, y) {
        let view = this.page.viewport();
        if (x > view.width) {
            x = view.width;
        }
        if (y > view.height) {
            y = view.height;
        }

        if (x < 0) {
            x = 0
        }
        if (y < 0) {
            y = 0;
        }
        this.mouseX = x
        this.mouseY = y
        this.page.mouse.move(x, y);
    }

    // Get mouse position of headless browser
    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY };
    }

    async mouseClick(x, y) {
        await this.setMousePosition(x, y);
        return this.page.mouse.click(this.mouseX, this.mouseY);
    }

    // Go to previous page
    async goBack() {
        this.page.goBack();
    }

    // Go to next page
    async goForward() {
        this.page.goForward();
    }

    async reload() {
        this.page.reload();
    }

};

module.exports = { Browser };