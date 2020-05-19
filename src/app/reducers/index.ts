import { combineReducers } from 'redux';

import { RootState } from './state';
import { usersReducer } from './users';
import { groupsReducer } from './groups';
import { interactionReducer } from './interaction';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  users: usersReducer,
  groups: groupsReducer,
  interaction: interactionReducer
});
