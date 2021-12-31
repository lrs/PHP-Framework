import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

import { nodeListAsArray } from '../helpers';

/**
 * @description Performs single page smooth scroll on selected elements.
 *
 * @export
 * @class Scroller
 */
export class Scroller {
    private t1: gsap.core.Tween;

    /**
     * @description initiate scrollable links.
     *
     * @param {string} menu
     * @memberOf Scroller
     */
    public set = (menu: string) => {
        gsap.registerPlugin(ScrollToPlugin);

        let scroller: HTMLElement,
        scrollerTarget: HTMLElement,
        scrollerSpeed: number,
        scrollerOffset: number;

        const scrollTargets: NodeListOf<HTMLElement> = document.querySelectorAll('[data-scrolltarget]');

        if (scrollTargets) {
            // Support IE9+
            const targets: HTMLElement[] = nodeListAsArray(scrollTargets);

            targets.forEach((target: HTMLElement) => {
                target.addEventListener<'click'>('click', (e: MouseEvent) => {
                    scroller = e.currentTarget as HTMLElement;
                    scrollerTarget = document.querySelector(scroller.dataset.scrolltarget);

                    if (scrollerTarget) {
                        this.onScroll(e);

                        scrollerSpeed = parseInt(scroller.dataset.scrollspeed, 10) || 1;
                        scrollerOffset = parseInt(scroller.dataset.scrolloffset, 10)
                            || document.querySelector(menu).getBoundingClientRect().height;
                        this.doScroller(scrollerSpeed, scrollerTarget, scrollerOffset);
                    }
                });
            });
        }
    }

    /**
     *
     *
     * @private
     * @param {Event} e
     *
     * @memberOf Scroller
     */
    private onScroll = (e: Event) => {
        e.preventDefault();

        // toggle twbs dropdown
        const m = document.querySelector('.menu');
        const c = document.querySelector('.list--menu-collapse');

        m.classList.remove('.menu--show');
        c.classList.remove('list__menu--show');
        // c.collapse('hide');
    }

    /**
     * @description perform the scroll animation.
     *
     * @private
     * @param {number} speed
     * @param {JQuery} target
     * @param {number} offset
     *
     * @memberOf Scroller
     */
    private doScroller = (speed: number, target: HTMLElement, offset: number) => {

        // add to browser history
        // if (history.pushState) {
        //   const url: string = `/#${target.attr('id')}`
        //   history.pushState({}, url, url)
        // }

        this.t1 = new gsap.core.Tween(
            window,
            speed,
            {
                ease: "power2.inOut",
                onComplete: () => {
                    // need to set target focus for keyboard only accessibility.
                    target.focus();

                    if (target !== document.activeElement as HTMLElement) {
                        target.setAttribute('tabindex', '-1');
                        target.focus();
                    }
                },
                paused: true,
                scrollTo: {
                    y: target.getBoundingClientRect().top - offset
                },
            }
        );

        this.t1.play();
    }
}
