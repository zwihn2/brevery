import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    ITEM_GET_REQUEST,
} from 'actions/types';
import {
    fetchItem,
} from 'clients/client';
import {
    itemGetSuccess,
    itemGetFailure,
} from 'actions/item-actions';

export function * workItemGetRequest (action) {
    const response = yield call(fetchItem, action.id);
    if (response.hasOwnProperty('error')) {
        yield put(itemGetFailure(response.error));
        return;
    }
    yield put(itemGetSuccess(response));
}

export function * watchItemGet () {
    yield takeLatest(ITEM_GET_REQUEST, workItemGetRequest);
}
