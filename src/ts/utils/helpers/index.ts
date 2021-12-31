export * from './Flash';

export const isEmpty = (str: string): boolean => (!str || /^\s*$/.test(str));

export const loadScript = (src: string): void => {
    const scriptNode = document.createElement('script');

    scriptNode.async = true;
    scriptNode.defer = true;
    scriptNode.src = src;

    document.body.appendChild(scriptNode);
};

export const inView = (el: Element, offset: number = 0): boolean =>
    (el.getBoundingClientRect().top < window.innerHeight - offset
    && el.getBoundingClientRect().bottom > 0);

type a = Element | HTMLElement | HTMLButtonElement | SVGElement;

export const nodeListAsArray = (nodeList: NodeListOf<a>): any[] => Array.prototype.slice.call(nodeList, 0);

interface IEvent {
    event: string;
    callback: () => void;
}

export class EventEmitter {
    private events: IEvent[];

    constructor() {
        this.events = [];
    }

    public on(event: string, callback: () => void): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    public trigger(event: string, ...data: any[]): boolean {
        if (!this.events[event]) {
            return false;
        }

        this.events[event].forEach((callback: () => void) => {
            callback.apply(null, ...data);
        });

        return true;
    }
}
