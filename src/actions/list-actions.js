// @flow
import {
    LIST_GET_REQUEST,
    LIST_GET_FAILURE,
    LIST_GET_SUCCESS,
    LIST_FILTERS_STATE_SELECT,
    LIST_FILTERS_CITY_SELECT,
    LIST_FILTERS_NAME_SELECT,
    LIST_FILTERS_TYPE_SELECT,
    LIST_FILTERS_TAGS_SELECT,
    LIST_FILTERS_KEYWORD_SELECT,
    LIST_CLEAR_ALL_FILTERS,
    LIST_FILTERS_PAGE_SELECT,
    LIST_FILTERS_PAGE_SIZE_SELECT,
    LIST_SEARCH_GET_REQUEST,
    LIST_SEARCH_GET_FAILURE,
    LIST_SEARCH_GET_SUCCESS,
    LIST_SORT,
} from 'actions/types';

export const listGetRequest = () => ({ type: LIST_GET_REQUEST });

export const listGetSuccess = data => ({
    type: LIST_GET_SUCCESS,
    data,
});

export const listGetFailure = error => ({
    type: LIST_GET_FAILURE,
    error,
});

export const listSearchGetRequest = () => ({ type: LIST_SEARCH_GET_REQUEST });

export const listSearchGetSuccess = data => ({
    type: LIST_SEARCH_GET_SUCCESS,
    data,
});

export const listSearchGetFailure = error => ({
    type: LIST_SEARCH_GET_FAILURE,
    error,
});

export const listStateSelect = state => ({
    type: LIST_FILTERS_STATE_SELECT,
    state,
});

export const listCitySelect = city => ({
    type: LIST_FILTERS_CITY_SELECT,
    city,
});

export const listTypeSelect = itemType => ({
    type: LIST_FILTERS_TYPE_SELECT,
    itemType,
});

export const listTagsSelect = tags => ({
    type: LIST_FILTERS_TAGS_SELECT,
    tags,
});

export const listNameSelect = name => ({
    type: LIST_FILTERS_NAME_SELECT,
    name,
});

export const listKeywordSelect = keyword => ({
    type: LIST_FILTERS_KEYWORD_SELECT,
    keyword,
});

export const listClearAllFilters = () => ({ type: LIST_CLEAR_ALL_FILTERS });

export const listPageSelect = page => ({
    type: LIST_FILTERS_PAGE_SELECT,
    page,
});

export const listPageSizeSelect = limit => ({
    type: LIST_FILTERS_PAGE_SIZE_SELECT,
    limit,
});

export const listSort = sortBy => ({
    type: LIST_SORT,
    sortBy,
});
