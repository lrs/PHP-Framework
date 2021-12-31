import config from '../config';

/**
 * @description Controls back-to-top scroller state.
 *
 * @export
 * @class MainScroller
 */
export class MainScroller {
    /**
     *
     *
     * @returns {boolean}
     *
     * @memberof MainScroller
     */
    public setMainScroller(): boolean {
        const scrollButton = document.querySelector(`.${ config.MAIN_SCROLLER_CLASS }`);

        if (scrollButton) {
            if (window.pageYOffset < document.body.clientHeight / 3) {
                scrollButton.classList.remove(`${ config.MAIN_SCROLLER_CLASS }--show`);

                return false;
            }

            scrollButton.classList.add(`${ config.MAIN_SCROLLER_CLASS }--show`);

            return true;
        }

        return false;
    }
}
