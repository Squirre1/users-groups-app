export enum ListTypes {
  SHOW_USERS = 'users',
  SHOW_GROUPS = 'groups'
}

export interface InteractionModel {
  selectedUsersIds: Set<string>,
  query: string
}
