import {Observable} from 'rxjs';
import {ComponentStore} from '@ngrx/component-store';

export class ReactiveStore<T> extends ComponentStore<{data: T}> {

    constructor(initialState: T) {
        super({data: initialState})
    }

    readonly data$: Observable<T> = this.select<T>((state: {data: T}) => state.data);

}
