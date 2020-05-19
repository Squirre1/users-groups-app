import React from 'react';
import { ListTypes } from 'app/models';
import { Row, Col, Container } from 'react-bootstrap';

import { SearchInput } from './SearchInput';
import { ListTypeSwitch } from './ListTypeSwitch';
import { GroupSelection } from './GroupSelection';

import style from './style.css';

export namespace TopBar {
  export interface Props {
    query: string,
    listType: ListTypes;
    selectedUsersIds: Set<string>;
    onChangeQuery: (query: string) => any;
    onGroupSelection: (name: string) => any;
    onClickListType: (filter: ListTypes) => any;
  }
}

export const TopBar = ({
  query,
  listType,
  selectedUsersIds,
  onChangeQuery,
  onClickListType,
  onGroupSelection
}: TopBar.Props): JSX.Element => {

  return (
    <Container className={style.topbar}>
      <Row className="p-3">
        <Col>
          <Row className="flex-nowrap">
            <ListTypeSwitch
              listType={listType}
              onClickListType={onClickListType}
            />
            <SearchInput
              query={query}
              onSearch={onChangeQuery}
            />
          </Row>
        </Col>
        <Col className="d-flex justify-content-end">
          <GroupSelection
            onGroupSelection={onGroupSelection}
            canSelectGroup={selectedUsersIds.size === 0}
          />
        </Col>
      </Row>
    </Container>
  );
};
