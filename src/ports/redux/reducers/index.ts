import { combineReducers } from 'redux';

// Reducer
import { monthReducer } from './monthReducer';

// Utils
import { ReducerType } from '../utils/redux';

export const reducers = combineReducers<ReducerType>({ month: monthReducer });
