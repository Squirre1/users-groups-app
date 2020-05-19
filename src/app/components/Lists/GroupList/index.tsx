import React from 'react';
import { List, ListRowProps, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { GroupWithUsersModel, GroupModel } from 'app/models';

import { GroupRow } from './GroupRow';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 40,
});

export namespace GroupList {
  export interface Props {
    groups: GroupWithUsersModel[],
    onUngroup: (group: GroupModel) => any
  }
}

export const GroupList = ({
  groups,
  onUngroup
}: GroupList.Props): JSX.Element => {

  const _renderGroup = React.useCallback(
    (props: ListRowProps): React.ReactNode => {
      const group = groups[props.index];

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={props.key}
          parent={props.parent}
          rowIndex={props.index}
        >
          {() => (
            <div key={props.key} style={props.style}>
              <GroupRow
                group={group}
                onUngroup={onUngroup}
              />
            </div>
          )}
        </CellMeasurer>
      );
    },
    [groups]
  );

  return (
    <List
      height={860}
      width={1100}
      rowHeight={cache.rowHeight}
      rowCount={groups.length}
      rowRenderer={_renderGroup}
      deferredMeasurementCache={cache}
    />
  );
};
