import config from '../config';
import { inView, nodeListAsArray } from '../helpers';

export const lazyLoad = (): void => {
    const lazyLoadableList: NodeListOf<HTMLElement> = document.querySelectorAll(
        `${ config.LAZY_LOAD_CLASS }:not([data-loaded="loaded"])`
    );

    if (lazyLoadableList) {
        // Support IE9+
        const nodes: HTMLElement[] = nodeListAsArray(lazyLoadableList);

        nodes.forEach((node: HTMLElement) => {
            let useNode: HTMLElement = node;

            // if node not img then get child image
            if ('IMG' !== useNode.tagName) {
                useNode = node.querySelector('img:first-of-type');
            }

            if (inView(useNode) && !useNode.classList.contains('lazyload--show')) {
                window.setTimeout(() => {
                    const state: string = node.dataset.loaded;

                    if ('loaded' !== state) {
                        if (inView(useNode)) {
                            node.dataset.loaded = 'loading';

                            const imgSrc: string = useNode.dataset.src;
                            useNode.setAttribute('src', imgSrc);
                            node.classList.add('lazyload--show');

                            node.dataset.loaded = 'loaded';
                        }
                    }
                }, 150);
            }
        });
    }
};
