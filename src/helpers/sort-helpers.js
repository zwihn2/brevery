import { SORT_DIRECTIONS } from 'constants/sort-constants';

export const sortData = (data, sortBy, sortOrder) => {
    let cmp = -1;
    if (sortOrder === SORT_DIRECTIONS.DESCENDING) {
        cmp = 1;
    }

    return data.slice().sort((a, b) => {
        if (!a[sortBy] && b[sortBy]) {
            return -cmp;
        }
        if (!b[sortBy] && a[sortBy]) {
            return cmp;
        }
        if (!b[sortBy] && !a[sortBy]) {
            return 0;
        }
        if (a[sortBy].valueOf() < b[sortBy].valueOf()) {
            return -cmp;
        }
        if (a[sortBy].valueOf() > b[sortBy].valueOf()) {
            return cmp;
        }

        return 0;
    });
};

export const getSortDirection = (sortBy, oldSortBy, oldSortOrder) => {
    let sortDirection = SORT_DIRECTIONS.ASCENDING;
    if (oldSortBy === sortBy && oldSortOrder === SORT_DIRECTIONS.ASCENDING) {
        sortDirection = SORT_DIRECTIONS.DESCENDING;
    }
    return sortDirection;
};

export const getSort = (sortBy, sortOrder) => {
    if (sortOrder === SORT_DIRECTIONS.DESCENDING) {
        return `-${sortBy}`;
    }

    return sortBy;
};
