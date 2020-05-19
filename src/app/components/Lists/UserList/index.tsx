import React from 'react';
import { List, ListRowProps } from 'react-virtualized';

import { UserModel, UserWithGroupModel } from 'app/models';

import { UserRow } from './UserRow';

export namespace UserList {
  export interface Props {
    users: (UserModel | UserWithGroupModel)[],
    selectedUsersIds: Set<string>,
    onSelectUser: (id: string) => any,
    onDetachUser: (user: UserWithGroupModel) => any
  }
}

export const UserList = ({
  users,
  selectedUsersIds,
  onSelectUser,
  onDetachUser
}: UserList.Props): JSX.Element => {

  const _renderPerson = React.useCallback(
    (props: ListRowProps): React.ReactNode => {
      const user = users[props.index] as UserWithGroupModel;

      return (
        <div key={props.key} style={props.style}>
          <UserRow
            user={user}
            selected={selectedUsersIds.has(user.id)}
            onSelectUser={onSelectUser}
            onDetachUser={onDetachUser}
          />
        </div>
      );
    },
    [users]
  );

  return (
    <List
      height={860}
      width={1100}
      rowHeight={40}
      rowCount={users.length}
      rowRenderer={_renderPerson}
    />
  );
};
