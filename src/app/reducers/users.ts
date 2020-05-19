import { handleActions } from 'redux-actions';
import { keyBy, omit } from 'lodash';

import { GroupsActions } from 'app/actions';
import { UsersActions } from 'app/actions/users';
import { UsersModel, GroupsModel, UserWithGroupModel, GroupModel } from 'app/models';

import { RootState } from './state';

const initialState: RootState.UsersState = {};

export const usersReducer = handleActions<RootState.UsersState, UsersModel | GroupsModel | GroupModel | UserWithGroupModel>(
  {
    [UsersActions.Type.SET_USERS]: (state, { payload }) => {
      const users = payload as UsersModel;

      return { ...state, ...users }
    },
    [UsersActions.Type.DETACH_USER]: (state, { payload }) => {
      const user = payload as UserWithGroupModel;
      const updatedUser = omit(user, ['groupId', 'groupName']);

      return { ...state, [user.id]: updatedUser }
    },
    [GroupsActions.Type.SELECT_GROUP]: (state, { payload }) => {
      const { group } = payload as GroupsModel;

      const users = group.userIds.map(id => ({
        ...state[id],
        groupId: group.id,
        groupName: group.name
      }))

      return { ...state, ...keyBy(users, 'id') }
    },
    [GroupsActions.Type.UNGROUP]: (state, { payload }) => {
      const group = payload as GroupModel;
      const getUser = (userId: string) => state[userId] as UserWithGroupModel;
      const users = group.userIds.map(userId => omit(getUser(userId), ['groupId', 'groupName']));

      return { ...state, ...keyBy(users, 'id') }
    },
  },
  initialState
);
