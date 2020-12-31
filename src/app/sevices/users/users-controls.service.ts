import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ComponentStore} from '@ngrx/component-store';

interface State {
    filterText: string;
}

@Injectable()
export class UsersControlsService extends ComponentStore<State> {

    filterCtrl: FormControl;

    constructor() {
        super({
            filterText: ''
        });
        this.filterCtrl = new FormControl();
        this.filterCtrl.valueChanges
            .subscribe((filterString: string) => {
                this.updateFilterText(filterString);
            });
                }

    readonly filterText$: Observable<string> = this.select<string>((state: State) => state.filterText);

    updateFilterText(filterText: string) {
        this.patchState({filterText});
    }
}
