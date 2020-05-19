import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import style from './style.css';

export namespace GroupSelection {
  export interface Props {
    canSelectGroup: boolean,
    onGroupSelection: (name: string) => any;
  }
}

export const GroupSelection = ({
  canSelectGroup,
  onGroupSelection
}: GroupSelection.Props): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setGroupName('');
  }

  const createGroup = React.useCallback(
    () => {
      onGroupSelection(groupName);
      handleClose();
    },
    [onGroupSelection, handleClose]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  return (
    <React.Fragment>
      <Button
        disabled={canSelectGroup}
        size="sm"
        variant="outline-dark"
        children="GROUP SELECTION"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Title
          className={`text-center ${style.header}`}
          children="CREATE NEW GROUP"
        />
        <div className={`d-flex justify-content-center align-items-center ${style.body}`}>
          <Form.Control
            className={style.input}
            type="text"
            autoFocus
            value={groupName}
            placeholder="Enter group name"
            onChange={handleChange}
          />
        </div>
        <Modal.Footer className={`justify-content-center ${style.footer}`}>
          <Button
            size="sm"
            variant="outline-dark"
            disabled={groupName.length === 0}
            children="CREATE GROUP"
            onClick={createGroup}
          />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
