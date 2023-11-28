import gsap from 'gsap';

import config from '../config';

export class Menu {
    // Custom events
    private hideEvent: Event = document.createEvent('Event');
    private showEvent: Event = document.createEvent('Event');

    private mainMenu: HTMLElement;
    private collapseMenu: HTMLElement;
    private menuAnim: gsap.core.Timeline;
    private toggler: HTMLButtonElement;
    private togglerIcon: SVGElement;
    private togglerIconUpper: SVGPathElement;
    private togglerIconMiddle: SVGPathElement;
    private togglerIconLower: SVGPathElement;
    private togglerIconAnim: gsap.core.Timeline;
    private menuDropdown: HTMLElement;
    private dropdownToggler: HTMLElement;

    constructor() {
        this.mainMenu = document.querySelector(config.MAIN_MENU);
        this.toggler = document.querySelector(config.MAIN_MENU_TOGGLER);
        this.togglerIcon = document.querySelector(config.MAIN_MENU_TOGGLER_ICON);
        this.togglerIconUpper = document.querySelector(`${ config.MAIN_MENU_TOGGLER_ICON }-upper`);
        this.togglerIconMiddle = document.querySelector(`${ config.MAIN_MENU_TOGGLER_ICON }-middle`);
        this.togglerIconLower = document.querySelector(`${ config.MAIN_MENU_TOGGLER_ICON }-lower`);
        this.collapseMenu = document.querySelector(config.MAIN_MENU_COLLAPSE);
        this.menuDropdown = document.querySelector(config.DROPDOWN_MENU);
        this.dropdownToggler = document.querySelector(config.DROPDOWN_MENU_TOGGLER);
    }

    public reset = () => {
        this.collapseMenu.classList.remove('list--menu-show');
        this.toggleMenu('show');
    }

    public toggled = (): boolean => 'true' === this.toggler.dataset.toggle ? true : false;

    public toggleMenu = (state: string): this => {
        switch (state) {
            case 'show':
                this.collapseMenu.dispatchEvent(this.showEvent);
                break;

            case 'hide':
                this.collapseMenu.dispatchEvent(this.hideEvent);
                break;

            default:
                this.collapseMenu.dispatchEvent(this.hideEvent);
                break;
        }

        return this;
    }

    public init = () => {
        if (this.mainMenu && this.toggler) {
            this.hideEvent.initEvent('hide', true, true);
            this.showEvent.initEvent('show', true, true);

            this.initMenuAnim();
            this.initToggleAnim();

            this.collapseMenu.addEventListener('hide', (e: Event) => {
                this.dropdownToggler.classList.remove('link--menu-toggled');
                this.menuDropdown && this.menuDropdown.classList.remove('menu__dropdown--show');

                if ('true' === this.toggler.dataset.toggle) {
                this.togglerIconAnim.reverse();

                this.menuAnim
                    .reverse()
                    .then(() => {
                        this.collapseMenu.removeAttribute('style');
                        this.mainMenu.classList.remove('menu--show');

                        this.toggler.dataset.toggle = 'false';
                    });
                }
            });

            this.collapseMenu.addEventListener('show', (e: Event) => {
                this.toggler.dataset.toggle = 'true';
                this.togglerIconAnim.play();
                this.menuAnim.play();
            });

            this.toggler.addEventListener<'click'>('click', (e: MouseEvent) => {
                e.preventDefault();

                const collapsed = this.toggler.dataset.toggle === 'true' ? true : false;

                this.mainMenu.classList.toggle('menu--show');
                this.collapseMenu.classList.toggle('list--menu-show');

                if (collapsed) {
                    this.toggleMenu('hide');
                } else {
                    this.toggleMenu('show');
                }
            });
        }

        if (this.dropdownToggler) {
            this.dropdownToggler.addEventListener<'click'>('click', (e: MouseEvent) => {
                e.preventDefault();

                this.dropdownToggler.classList.toggle('link--menu-toggled');

                this.menuDropdown && this.menuDropdown.classList.toggle('menu__dropdown--show');
            });
        }
    }

    private initMenuAnim = () => {
        this.menuAnim = new gsap.core.Timeline();

        this.menuAnim
            .add('start', 0)
            .add('next', 0.25)
            .to(
                this.collapseMenu,
                {
                    duration: 0.5,
                    ease: 'power2.in',
                    y: 0
                },
                'start'
            )
            .to(
                this.collapseMenu,
                {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'power2.in'
                },
                'next'
            )
            .pause();
    }

    private initToggleAnim = () => {
        this.togglerIconAnim = new gsap.core.Timeline();

        this.togglerIconAnim
            .add('start', 0)
            .add('next', 0.15)
            .to(
                this.togglerIconUpper,
                {
                    duration: 0.15,
                    ease: 'power2.in',
                    transformOrigin: '50% 50%',
                    y: 8
                },
                'start'
            )
            .to(
                this.togglerIconLower,
                {
                    duration: 0.15,
                    ease: 'power2.in',
                    transformOrigin: '50% 50%',
                    y: -8
                },
                'start'
            )
            .to(
                this.togglerIcon,
                {
                    duration: 0.25,
                    ease: 'power3.inOut',
                    rotationZ: 90
                },
                'next'
            )
            .to(
                this.togglerIconMiddle,
                {
                    duration: 0.25,
                    ease: 'power2.out',
                    opacity: 0,
                    scale: 0
                },
                'next'
            )
            .to(
                this.togglerIconUpper,
                {
                    duration: 0.25,
                    ease: 'power2.out',
                    rotationZ: 45,
                    strokeDasharray: 'none',
                    strokeDashoffset: 0,
                    transformOrigin: '50% 50%'
                },
                'next'
            )
            .to(
                this.togglerIconLower,
                {
                    duration: 0.25,
                    ease: 'power2.out',
                    rotationZ: -45,
                    strokeDasharray: 'none',
                    strokeDashoffset: 0,
                    transformOrigin: '50% 50%'
                },
                'next'
            )
            .pause();
    }
}
