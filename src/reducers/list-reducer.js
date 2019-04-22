import {
    PAGE_SIZE,
} from 'constants/basic';
import {
    LIST_GET_REQUEST,
    LIST_GET_SUCCESS,
    LIST_GET_FAILURE,
    LIST_FILTERS_STATE_SELECT,
    LIST_FILTERS_CITY_SELECT,
    LIST_FILTERS_TYPE_SELECT,
    LIST_FILTERS_TAGS_SELECT,
    LIST_FILTERS_NAME_SELECT,
    LIST_CLEAR_ALL_FILTERS,
    LIST_FILTERS_KEYWORD_SELECT,
    LIST_SEARCH_GET_REQUEST,
    LIST_SEARCH_GET_FAILURE,
    LIST_SEARCH_GET_SUCCESS,
    LIST_FILTERS_PAGE_SELECT,
    LIST_FILTERS_PAGE_SIZE_SELECT,
    LIST_SORT,
} from 'actions/types';
import initialState from 'reducers/initial-state';
import { getSortDirection } from 'helpers/sort-helpers';

/* eslint-disable complexity */
const listReducer = (state = initialState.list, action) => {
    switch (action.type) {
        case LIST_GET_REQUEST:
            return {
                ...state,
                isListLoading: true,
            };

        case LIST_GET_SUCCESS:
            return {
                ...state,

                content: action.data,
                isListLoading: false,
            };

        case LIST_GET_FAILURE:
            return {
                ...state,
                isListLoading: false,
            };

        case LIST_SEARCH_GET_REQUEST:
            return {
                ...state,
                isListLoading: true,
            };

        case LIST_SEARCH_GET_SUCCESS:
            return {
                ...state,

                content: action.data,
                isListLoading: false,
            };

        case LIST_SEARCH_GET_FAILURE:
            return {
                ...state,
                isListLoading: false,
            };

        case LIST_FILTERS_STATE_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    state: action.state,
                },
            };

        case LIST_FILTERS_CITY_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    city: action.city,
                },
            };

        case LIST_FILTERS_TYPE_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    type: action.itemType,
                },
            };

        case LIST_FILTERS_TAGS_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    tags: action.tags,
                },
            };

        case LIST_FILTERS_NAME_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    name: action.name,
                },
            };

        case LIST_FILTERS_KEYWORD_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    keyword: action.keyword,
                },
            };

        case LIST_CLEAR_ALL_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    state: null,
                    city: null,
                    name: '',
                    type: null,
                    tags: [],
                    page: 1,
                    limit: PAGE_SIZE,
                    keyword: '',
                },
            };

        case LIST_FILTERS_PAGE_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    page: action.page,
                },
            };

        case LIST_FILTERS_PAGE_SIZE_SELECT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    page: 1,
                    limit: action.limit,
                },
            };

        case LIST_SORT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    page: 1,
                    sortBy: action.sortBy,
                    sortOrder: getSortDirection(action.sortBy, state.filters.sortBy, state.filters.sortOrder),
                },
            };

        default:
            return state;
    }
};

export default listReducer;
