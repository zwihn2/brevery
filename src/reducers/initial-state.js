// @flow
import {
    LIST_SORT_BY,
    SORT_DIRECTIONS,
} from 'constants/sort-constants';
import {
    PAGE_SIZE,
} from 'constants/basic';

const initialState = {
    list: {
        filters: {
            state: null,
            city: null,
            name: '',
            type: null,
            tags: [],
            page: 1,
            limit: PAGE_SIZE,
            sortBy: LIST_SORT_BY,
            sortOrder: SORT_DIRECTIONS.DEFAULT,
            keyword: '',
        },
        isListLoading: false,
        content: [],
    },
    item: {
        isItemLoading: false,
        data: null,
        id: null,
    },
};

export default initialState;
