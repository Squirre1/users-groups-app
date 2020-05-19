import { UserModel } from "./UserModel";

export interface GroupModel {
  id: string,
  name: string,
  userIds: string[]
}

export interface GroupWithUsersModel extends GroupModel {
  users: UserModel[]
}

export interface GroupsModel {
  [id: string]: GroupModel
}
