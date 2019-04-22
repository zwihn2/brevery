import {
    getSort,
} from 'helpers/sort-helpers';

export const getApiFilterQuery = ({ list: { filters } }) => ({
    query: filters.keyword,
});

const getApiFilterOptions = ({ list: { filters } }) => ({
    by_state: filters.state ? filters.state.name : null,
    by_city: filters.city ? filters.city.city : null,
    by_type: filters.type ? filters.type.type : null,
    by_name: filters.name,
    // page: filters.page,
    // per_page: filters.limit,
});

export const getListApiFilters = state => {
    const { tags, sortBy, sortOrder } = state.list.filters;
    const sort = getSort(sortBy, sortOrder);
    const tagsList = tags.map(item => item.tag).join(',');
    return {
        ...getApiFilterOptions(state),
        by_tags: tagsList,
        sort,
    };
};
