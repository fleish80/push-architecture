import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {CurrentUserState} from './current-user-state.model';
import * as UserActions from './current-user.actions';

const userFeatureState = createFeatureSelector<CurrentUserState>('users');

export const currentUser = createSelector(
    userFeatureState,
    (state: CurrentUserState) => state.currentUser
)

export const currentUserId = createSelector(
    userFeatureState,
    (state: CurrentUserState) => state.currentUser?.id
)

export const currentUserReducer = createReducer<CurrentUserState>(
    {currentUser: null},
    on(UserActions.selectCurrentUser, (state: CurrentUserState, action): CurrentUserState => {
        return {currentUser: action.currentUser};
    })
);

