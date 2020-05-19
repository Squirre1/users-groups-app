import axios from 'axios';
import { keyBy } from 'lodash';
import { createAction } from 'redux-actions';

import { createActionsHook } from '../utils';

export namespace UsersActions {
  export enum Type {
    SET_USERS = 'SET_USERS',
    FETCH_USERS = 'FETCH_USERS',
    DETACH_USER = 'DETACH_USER'
  }

  export const setUsers = createAction(Type.SET_USERS);
  export const detachUser = createAction(Type.DETACH_USER);

  export const fetchUsers = () => async (dispatch: Function) => {
    const users = await axios.get('http://www.json-generator.com/api/json/get/crePXQuaSq?indent=2');
    dispatch(setUsers(keyBy(users.data, 'id')))
  }
}

export type UsersActions = Omit<typeof UsersActions, 'Type'>;
export const useUsersActions = createActionsHook<UsersActions>(UsersActions);
