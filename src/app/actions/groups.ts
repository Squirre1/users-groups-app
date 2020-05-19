import uniqid from 'uniqid';
import { createAction } from 'redux-actions';

import { RootState } from 'app/reducers';

import { createActionsHook } from '../utils';

export namespace GroupsActions {
  export enum Type {
    SELECT_GROUP = 'SELECT_GROUP',
    UNGROUP = 'UNGROUP'
  }

  export const ungroup = createAction(Type.UNGROUP);

  export const selectGroup = (name: string) => async (dispatch: Function, getState: () => RootState) => {
    const { interaction: { selectedUsersIds }} = getState();

    dispatch({
      type: Type.SELECT_GROUP,
      payload: {
        group: {
          id: uniqid(),
          name,
          userIds: Array.from(selectedUsersIds)
        }
      }
    })
  }
}

export type GroupsActions = Omit<typeof GroupsActions, 'Type'>;
export const useGroupsActions = createActionsHook(GroupsActions);
