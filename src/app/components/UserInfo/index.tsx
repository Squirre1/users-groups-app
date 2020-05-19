import React from 'react';

import { UserModel } from 'app/models';

import style from './style.css';

export namespace UserRow {
  export interface Props {
    user: UserModel
  }
}

export const UserInfo = ({
  user
}: UserRow.Props): JSX.Element => {
  return (
    <div className={`d-flex ${style.info}`}>
      <div
        className={style.name}
        children={user.name}
      />
      <div children={`Age: ${user.age}`} />
      <div children={`Email: ${user.email}`} />
    </div>
  );
};
