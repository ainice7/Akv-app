import {combineReducers} from 'redux';

import { data } from './data';
import { loading } from './loading';

export const rootReducer = combineReducers({
    loading,
    data
});