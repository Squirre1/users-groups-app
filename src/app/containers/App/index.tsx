import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { pickBy, compact } from 'lodash';

import { RootState } from 'app/reducers';
import { ListTypes } from 'app/models';
import { TopBar, GroupList, UserList } from 'app/components';
import { useUsersActions, useInteractionActions, useGroupsActions } from 'app/actions';

import style from './style.css';


const FILTER_VALUES = (Object.keys(ListTypes) as (keyof typeof ListTypes)[]).map(
  (key) => ListTypes[key]
);

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = ({ history, location }: App.Props) => {
  const dispatch = useDispatch();

  const usersActions = useUsersActions(dispatch);
  const interactionActions = useInteractionActions(dispatch);
  const groupsActions = useGroupsActions(dispatch);

  const {
    query,
    users,
    groups,
    listType,
    selectedUsersIds
  } = useSelector((state: RootState) => {
    const hash = location?.hash?.replace('#', '');

    const users = pickBy(state.users, user => `${user.name}${user.email}`.includes(state.interaction.query));

    return {
      users: Object.values(users),
      query: state.interaction.query,
      selectedUsersIds: state.interaction.selectedUsersIds,
      listType: FILTER_VALUES.find((value) => value === hash) ?? ListTypes.SHOW_USERS,
      groups: Object.values(state.groups).map(group => ({ ...group, users: compact(group.userIds.map(id => users[id])) })),
    };
  });

  React.useEffect(() => {
    usersActions.fetchUsers()
  }, [])

  const handleListType = React.useCallback(
    (filter: ListTypes): void => {
      history.push(`#${filter}`);
    },
    [history]
  );

  return (
    <Container fluid="md">
      <Row className={style.normal}>
        <TopBar
          query={query}
          listType={listType}
          selectedUsersIds={selectedUsersIds}
          onChangeQuery={interactionActions.changeQuery}
          onClickListType={handleListType}
          onGroupSelection={groupsActions.selectGroup}
        />
      </Row>
      <Row className={style.normal}>
        {listType === ListTypes.SHOW_USERS ? (
          <UserList
            users={users}
            selectedUsersIds={selectedUsersIds}
            onSelectUser={interactionActions.selectUser}
            onDetachUser={usersActions.detachUser}
          />
        ) : (
          <GroupList
            groups={groups}
            onUngroup={groupsActions.ungroup}
          />
        )}
      </Row>
    </Container>
  );
};
