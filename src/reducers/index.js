// @flow
import { combineReducers } from 'redux';

import listReducer from './list-reducer';
import itemReducer from './item-reducer';

const rootReducer = combineReducers({
    list: listReducer,
    item: itemReducer,
});

export default rootReducer;
