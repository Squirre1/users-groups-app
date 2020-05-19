export interface UserModel {
  id: string,
  email: string,
  age: number,
  name: string
}

export interface UserWithGroupModel extends UserModel {
  groupId: string,
  groupName: string,
}

export interface UsersModel {
  [id: string]: UserModel | UserWithGroupModel
}
