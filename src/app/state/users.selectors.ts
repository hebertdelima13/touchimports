import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersPartialState, UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersPartialState, UsersState>(
  USERS_FEATURE_KEY
);

export const getUser:any = createSelector(getUsersState, (state) => state.user);

export const getUserIsAuth:any = createSelector(getUsersState, (state) => state.isAuthenticated);
