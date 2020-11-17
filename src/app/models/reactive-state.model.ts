import {BehaviorSubject, Observable} from 'rxjs';
import {reduxExtension} from '../utils/redux-extension.util';

export class ReactiveState<T> {

    private readonly state$: BehaviorSubject<T>;

    protected get state(): T {
        return this.state$.getValue();
    }

    constructor(initialState: T) {
        this.state$ = new BehaviorSubject<T>(initialState);
    }

    getState(): Observable<T> {
        return this.state$.asObservable();
    }

    public setState(newState: Partial<T> | T): void {
        reduxExtension.sendAction('set-state', newState);
        if (typeof newState === 'object') {
            this.state$.next({
                ...this.state,
                ...newState,
            });
        } else {
            this.state$.next(newState);
        }
    }

    protected updateExtension(action): void {
        reduxExtension.sendAction(action, this.state);
    }

}
