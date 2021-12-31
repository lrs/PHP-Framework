import { ConsentModel } from '../models';

export class Cookies {
    private base: HTMLElement;
    private cookies: HTMLElement;
    private cookiesClose: HTMLElement;
    private cookiesAllow: HTMLButtonElement;

    constructor() {
        this.base = document.querySelector('.base');
        this.cookies = document.querySelector('.cookies');
        this.cookiesClose = document.querySelector('.cookies__close');
        this.cookiesAllow = document.querySelector('.cookies__allow');
    }

    public init = (): void => {
        if (this.cookies) {
            this.cookiesAllow.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.allow();
            });

            this.cookiesClose.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.close();
            });
        }
    }

    private allow = (): void => {
        const consent = new ConsentModel();

        consent.set()
            .then(() => {
                location.reload();
            })
            .catch(err => {
                console.error('consent set error: ', err);
            });
    }

    private close = (): void => {
        this.cookies.classList.remove('cookies--show');
        this.base.classList.remove('base--clear-cookies');
    }
}
