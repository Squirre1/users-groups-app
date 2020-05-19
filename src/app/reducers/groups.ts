import { handleActions } from 'redux-actions';
import { without, omit } from 'lodash';

import { GroupsModel, UserWithGroupModel, GroupModel } from 'app/models';
import { GroupsActions, UsersActions } from 'app/actions';

import { RootState } from './state';

const initialState: RootState.GroupsState = {};

export const groupsReducer = handleActions<RootState.GroupsState, GroupsModel | UserWithGroupModel | GroupModel>(
  {
    [GroupsActions.Type.SELECT_GROUP]: (state, { payload }) => {
      const { group } = payload as GroupsModel;

      return { ...state, [group.id]: group }
    },
    [GroupsActions.Type.UNGROUP]: (state, { payload }) => {
      const group = payload as GroupModel;

      return omit(state, group.id)
    },
    [UsersActions.Type.DETACH_USER]: (state, { payload }) => {
      const user = payload as UserWithGroupModel;
      const group = state[user.groupId!];

      const userIds = without(group.userIds, user.id);

      return userIds.length === 0
        ? omit(state, group.id)
        : { ...state, [group.id]: {...group, userIds} }
    },
  },
  initialState
);
