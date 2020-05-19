import { createAction } from 'redux-actions';

import { createActionsHook } from '../utils';

export namespace InteractionActions {
  export enum Type {
    SELECT_USER = 'SELECT_USER',
    CHANGE_QUERY = 'CHANGE_QUERY'
  }

  export const selectUser = createAction<string>(Type.SELECT_USER);
  export const changeQuery = createAction<string>(Type.CHANGE_QUERY);
}

export type InteractionActions = Omit<typeof InteractionActions, 'Type'>;
export const useInteractionActions = createActionsHook(InteractionActions);
