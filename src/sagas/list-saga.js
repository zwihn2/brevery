import {
    call,
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';

import {
    LIST_GET_REQUEST,
    LIST_CLEAR_ALL_FILTERS,
    // LIST_FILTERS_PAGE_SELECT,
    // LIST_FILTERS_PAGE_SIZE_SELECT,
    LIST_SEARCH_GET_REQUEST,
} from 'actions/types';
import {
    listGetFailure,
    listGetSuccess,
    listSearchGetSuccess,
    listSearchGetFailure,
} from 'actions/list-actions';
import {
    fetchList,
    fetchListSearch,
} from 'clients/client';
import {
    getListApiFilters,
    getApiFilterQuery,
} from 'reducers/selectors';

export function * workListGet () {
    const filters = yield select(getListApiFilters);
    const response = yield call(fetchList, filters);
    if (response.hasOwnProperty('error')) {
        yield put(listGetFailure(response.error));
        return;
    }
    yield put(listGetSuccess(response));
}

export function * watchListGet () {
    yield takeEvery([
        LIST_GET_REQUEST,
        LIST_CLEAR_ALL_FILTERS,
    ], workListGet);
}

export function * workListSearchGet () {
    const filters = yield select(getApiFilterQuery);
    const response = yield call(fetchListSearch, filters);
    if (response.hasOwnProperty('error')) {
        yield put(listSearchGetFailure(response.error));
        return;
    }
    yield put(listSearchGetSuccess(response));
}

export function * watchListSearchGet () {
    yield takeEvery([
        LIST_SEARCH_GET_REQUEST,
    ], workListSearchGet);
}
