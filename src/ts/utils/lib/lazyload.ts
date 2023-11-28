import config from '../config';

import { lazyLoad } from '../helpers';

const callbackAction = (target: HTMLElement) => {
    const img: HTMLImageElement = target.getElementsByTagName('img')[0];
    const vid: HTMLVideoElement = target.getElementsByTagName('video')[0];

    if (img) {
        img.src = img.dataset.src;

        if (img.dataset.srcset) {
            img.setAttribute('srcset', img.dataset.srcset);
            img.setAttribute('sizes', img.dataset.sizes);
        }
    }

    if (vid) {
        vid.setAttribute('poster', vid.dataset.poster);
        vid.setAttribute('src', vid.dataset.src);
        vid.setAttribute('preload', 'metadata');
    }

    target.classList.add('show');
};

export const lazyLoader = () => {
    lazyLoad(
        callbackAction,
        `${ config.LAZY_LOAD_CLASS }:not([data-loaded="loaded"])`,
        0.25,
        null,
        '0px'
    );
};
