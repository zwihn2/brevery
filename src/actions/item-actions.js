// @flow
import {
    ITEM_GET_REQUEST,
    ITEM_GET_FAILURE,
    ITEM_GET_SUCCESS,
    ITEM_SELECT_ID,
} from 'actions/types';

export const itemGetRequest = id => ({
    type: ITEM_GET_REQUEST,
    id,
});

export const itemGetSuccess = data => ({
    type: ITEM_GET_SUCCESS,
    data,
});

export const itemGetFailure = error => ({
    type: ITEM_GET_FAILURE,
    error,
});

export const itemSelectId = id => ({
    type: ITEM_SELECT_ID,
    id,
});
