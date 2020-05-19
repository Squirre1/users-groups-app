import { UsersModel, GroupsModel, InteractionModel } from 'app/models';

export interface RootState {
  users: RootState.UsersState;
  groups: RootState.GroupsState;
  interaction: RootState.InteractionState;
  router?: any;
}

export namespace RootState {
  export type UsersState = UsersModel;
  export type GroupsState = GroupsModel;
  export type InteractionState = InteractionModel;
}
