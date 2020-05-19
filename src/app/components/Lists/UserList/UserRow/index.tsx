import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { UserWithGroupModel } from 'app/models';

import { UserInfo } from '../../../UserInfo'

import style from './style.css';

export namespace UserRow {
  export interface Props {
    user: UserWithGroupModel,
    selected: boolean,
    onSelectUser: (id: string) => any,
    onDetachUser: (user: UserWithGroupModel) => any
  }
}

export const UserRow = ({
  user,
  selected,
  onSelectUser,
  onDetachUser
}: UserRow.Props): JSX.Element => {


  const selectUser = React.useCallback(
    () => onSelectUser(user.id),
    [user, onSelectUser]
  )

  const detachUser = React.useCallback(
    () => onDetachUser(user),
    [user, onDetachUser]
  )

  return (
    <Row className={style.user}>
      <Col className="d-flex">
        <div
          onClick={selectUser}
          className="d-flex align-items-center"
        >
          <Form.Check
            readOnly
            type="radio"
            className={style.check}
            disabled={Boolean(user.groupId)}
            checked={selected || Boolean(user.groupId)}
          />
          <UserInfo user={user} />
        </div>
      </Col>
      { user.groupId && (
        <Col className="d-flex justify-content-end">
          <div className="d-flex align-items-center">
            <span children={`Group: ${user.groupName}`} />
            <Button
              variant="outline-dark"
              className={style.detach}
              size="sm"
              children="DETACH"
              onClick={detachUser}
            />
          </div>
        </Col>
      )}
    </Row>
  );
};
