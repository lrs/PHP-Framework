export class Flash {
    private flash: HTMLElement;
    private flashMsg: HTMLElement;
    private flashClose: HTMLElement;
    private flashTimeoutDur: number;
    private flashTimeoutId: number;

    constructor(msgTimeout: number = 15000) {
        this.flashTimeoutDur = msgTimeout;
        this.flash = document.querySelector('.flash');
        this.flashMsg = this.flash.querySelector('.flash__message');
        this.flashClose = document.querySelector('.flash__close');
        this.flashClose.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.close();
        });
    }

    public set = (msg: string, state: string, autoTimeout: boolean = true): void => {
        this.flash.classList.remove(
            'flash--loading',
            'flash--success',
            'flash--warning',
            'flash--error'
            );
        this.flashMsg.innerText = msg;
        this.flash.classList.add(`flash--${ state }`, 'flash--show');

        // remove show class after timeout
        // clear the last timeout first
        if (this.flashTimeoutId) {
            window.clearTimeout(this.flashTimeoutId);
            this.flashTimeoutId = undefined;
        }

        if (autoTimeout) {
            this.flashTimeoutId = window.setTimeout(
                () => { this.close();  },
                this.flashTimeoutDur
            );
        }
    }

    private close = (): void => {
        if (this.flashTimeoutId) {
            window.clearTimeout(this.flashTimeoutId);
            this.flashTimeoutId = undefined;
        }

        this.flashMsg.innerText = 'Context message';
        this.flash.classList.remove(
            'flash--show',
            'flash--loading',
            'flash--success',
            'flash--warning',
            'flash--error'
        );

        // reload page?
    }
}
