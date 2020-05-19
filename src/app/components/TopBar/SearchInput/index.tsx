import React from 'react';
import { Form } from 'react-bootstrap';

import style from './style.css';

export namespace SearchInput {
  export interface Props {
    query: string;
    onSearch: (text: string) => void;
  }
}

export const SearchInput = ({
  query,
  onSearch
}: SearchInput.Props): JSX.Element => {

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  return (
    <Form.Control
      className={style.input}
      type="text"
      autoFocus
      placeholder="Enter query for filter"
      value={query}
      onChange={handleChange}
    />
  );
};
