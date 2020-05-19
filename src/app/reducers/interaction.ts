import { handleActions } from 'redux-actions';
import { InteractionActions, GroupsActions } from 'app/actions';

import { RootState } from './state';

const initialState: RootState.InteractionState = {
  selectedUsersIds: new Set(),
  query: ''
};

export const interactionReducer = handleActions<RootState.InteractionState, string>(
  {
    [InteractionActions.Type.SELECT_USER]: (state, action) => {
      const userId = action.payload;
      const selectedUsersIds = state.selectedUsersIds;

      selectedUsersIds.has(userId)
        ? selectedUsersIds.delete(userId)
        : selectedUsersIds.add(userId)

      return { ...state, selectedUsersIds }
    },
    [InteractionActions.Type.CHANGE_QUERY]: (state, action) => {
      return { ...state, query: action.payload }
    },
    [GroupsActions.Type.SELECT_GROUP]: (state) => {
      return { ...state, selectedUsersIds: new Set() }
    }
  },
  initialState
);
