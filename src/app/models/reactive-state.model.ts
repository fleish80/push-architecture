import {BehaviorSubject, Observable} from 'rxjs';
import {reduxExtension} from '../utils/redux-extension.util';

export class ReactiveState<T> {

    private readonly state$: BehaviorSubject<T>;

    constructor(initialState: T) {
        reduxExtension.sendAction(this.constructor, initialState);
        this.state$ = new BehaviorSubject<T>(initialState);
    }

    getState(): Observable<T> {
        return this.state$.asObservable();
    }

    public setState(newState: Partial<T> | T): void {
        reduxExtension.sendAction(this.constructor, newState);
        if (typeof newState === 'object') {
            this.state$.next({
                ...this.state$.getValue(),
                ...newState,
            });
        } else {
            this.state$.next(newState);
        }
    }
}
