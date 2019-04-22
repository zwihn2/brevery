import {
    ITEM_GET_REQUEST,
    ITEM_GET_FAILURE,
    ITEM_GET_SUCCESS,
    ITEM_SELECT_ID,
} from 'actions/types';

import initialState from 'reducers/initial-state';

/* eslint-disable complexity */
const itemReducer = (state = initialState.item, action) => {
    switch (action.type) {
        case ITEM_GET_REQUEST:
            return {
                ...state,
                isItemLoading: true,
            };

        case ITEM_GET_SUCCESS:
            return {
                ...state,
                data: action.data,
                isItemLoading: false,
            };

        case ITEM_GET_FAILURE:
            return {
                ...state,
                isItemLoading: false,
            };

        case ITEM_SELECT_ID:
            return {
                ...state,
                id: action.id,
            };

        default:
            return state;
    }
};

export default itemReducer;
