import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Domain
import { Month } from '../../../domain/entities/monthEntities';

export type Handler<S> = {
  // @ts-ignore
  [key: string]: (state: S, action) => S;
};

export type ReducerType = { month: Month };

export type Dispatch<A> = ThunkAction<void, ReducerType, unknown, Action<A>>;

export const createReducer = <S, H extends Handler<S>>(initialState: S, handlers: H) => {
  return (state: S = initialState, action: Action<string>): S => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};
