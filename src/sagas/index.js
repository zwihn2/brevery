// @flow
import { all, fork } from 'redux-saga/effects';
import {
    watchListGet,
    watchListSearchGet,
} from 'sagas/list-saga';
import {
    watchItemGet,
} from 'sagas/item-saga';

import type { Saga } from 'redux-saga';

export default function * (): Saga<void> {
    yield all([
        fork(watchListGet),
        fork(watchListSearchGet),
        fork(watchItemGet),
    ]);
}
