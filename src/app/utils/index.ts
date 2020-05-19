import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';

export function createActionsHook<T> (reduxActions: T) {
  return (dispatch: Dispatch) => {
    // @ts-ignore
    const { Type, ...actions } = reduxActions;
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as T;
  };
}
