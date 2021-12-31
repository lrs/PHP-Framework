import throttle from 'lodash.throttle';

import config from './config';

import {
    Menu,
    lazyLoad,
    MainScroller,
    Scroller,
    Cookies
} from './lib';

window.addEventListener('DOMContentLoaded', () => {
    const menu: HTMLElement = document.querySelector(config.MAIN_MENU);
    const mainMenu = new Menu();
    mainMenu.init();

    const scroller: MainScroller = new MainScroller();
    const s: Scroller = new Scroller();

    // Only do smoothscroll if allowed.
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mql.matches) {
        s.set(config.MAIN_MENU);
    }

    const cookies = new Cookies();
    cookies.init();

    let lastScrollY = window.scrollY;

    const repeatable = (): void => {
        const winWidth = window.innerWidth;

        const scrollY = window.scrollY;

        if (992 <= winWidth) {
            mainMenu.toggleMenu('hide');

            if (260 < scrollY && lastScrollY < scrollY) {
                menu.classList.add('menu--hidden');
            }
        }

        if (lastScrollY > scrollY) {
            menu.classList.remove('menu--hidden');
        }

        lastScrollY = scrollY;

        if (30 >= lastScrollY) {
            menu.classList.remove('menu--content');
        } else {
            menu.classList.add('menu--content');
        }

        lazyLoad();

        scroller.setMainScroller();
    };

    repeatable();

    window.addEventListener<'scroll'>('scroll', throttle(() => repeatable(), 250));
    window.addEventListener<'resize'>('resize', throttle(() => repeatable(), 250));

    document.addEventListener<'mouseup'>('mouseup', (e: MouseEvent) => {
        const trigger: HTMLElement = e.target as unknown as HTMLElement;

        if (!trigger.closest(config.MAIN_MENU)) {
            mainMenu.toggleMenu('hide');
        }
    });
});
