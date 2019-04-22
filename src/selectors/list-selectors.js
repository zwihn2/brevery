export const getListToolbarFilters = state => ({
    state: state.list.filters.state,
    city: state.list.filters.city,
    type: state.list.filters.type,
    tags: state.list.filters.tags,
    name: state.list.filters.name,
    keyword: state.list.filters.keyword,
});
