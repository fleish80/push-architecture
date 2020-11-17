const withDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

class ReduxExtension {
    private devTools: any;

    constructor() {
        if (withDevTools) {
            this.devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
        }
    }

    public sendAction(action: string, state: any): void {
        this.devTools.send(action, state);
    }
}

export const reduxExtension = new ReduxExtension();
