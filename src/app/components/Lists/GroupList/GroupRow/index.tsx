import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { GroupWithUsersModel, GroupModel } from 'app/models';

import { UserInfo } from '../../../UserInfo'

import style from './style.css';

export namespace GroupRow {
  export interface Props {
    group: GroupWithUsersModel,
    onUngroup: (group: GroupModel) => any
  }
}

export const GroupRow = ({
  group,
  onUngroup
}: GroupRow.Props): JSX.Element => {

  const ungroup = React.useCallback(
    () => onUngroup(group),
    [group, onUngroup]
  )

  return (
    <Container>
      <Row className={style.group}>
        <Col className="d-flex align-items-center p-0">
          <span children={group.name} />
        </Col>
        <Col className="d-flex justify-content-end p-0">
          <Button
            variant="outline-dark"
            size="sm"
            className={style.ungroup}
            children="UNGROUP"
            onClick={ungroup}
          />
        </Col>
      </Row>
      {group.users.map((user) => (
        <Row key={user.id} className={`d-flex align-items-center ${style.user}`}>
          <UserInfo user={user} />
        </Row>
      ))}
    </Container>
  );
};
