import React from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup } from 'react-bootstrap';

import { ListTypes } from 'app/models';

import style from './style.css';

export const LIST_TITLES = {
  [ListTypes.SHOW_USERS]: 'USERS',
  [ListTypes.SHOW_GROUPS]: 'GROUPS'
};

export namespace ListTypeSwitch {
  export interface Props {
    listType: ListTypes;
    onClickListType: (filter: ListTypes) => any;
  }
}

export const ListTypeSwitch = ({
  listType,
  onClickListType
}: ListTypeSwitch.Props): JSX.Element => {

  const renderListTypeLink = React.useCallback(
    (selectedListType: ListTypes, key: string): JSX.Element => (
      <Button
        key={key}
        className={classNames({ [style.selected]: listType === selectedListType })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickListType(selectedListType)}
        children={LIST_TITLES[selectedListType]}
        variant="outline-dark"
        size="sm"
      />
    ),
    [listType, onClickListType]
  );

  return (
    <ButtonGroup className={style.types}>
      {(Object.keys(ListTypes) as (keyof typeof ListTypes)[]).map((key) => renderListTypeLink(ListTypes[key], key))}
    </ButtonGroup>
  );
};
