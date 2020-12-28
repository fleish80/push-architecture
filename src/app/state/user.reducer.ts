import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {UserState} from './user-state.model';
import * as UserActions from './user.actions';

const userFeatureState = createFeatureSelector<UserState>('users');

export const currentUser = createSelector(
    userFeatureState,
    (state: UserState) => state.currentUser
)

export const currentUserId = createSelector(
    userFeatureState,
    (state: UserState) => state.currentUser?.id
)

export const userReducer = createReducer<UserState>(
    {currentUser: null},
    on(UserActions.selectUser, (state: UserState, action): UserState => {
        return {currentUser: action.currentUser};
    })
);

