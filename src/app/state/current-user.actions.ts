import {createAction, props} from '@ngrx/store';
import {User} from '../models/user.model';

export const selectCurrentUser = createAction(
    '[User] select user',
    props<{ currentUser: User }>()
);
