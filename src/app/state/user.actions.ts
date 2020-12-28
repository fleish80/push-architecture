import {createAction, props} from '@ngrx/store';
import {User} from '../models/user.model';

export const selectUser = createAction(
    '[User] select user',
    props<{ currentUser: User }>()
);
