import URLSearchParams from 'url-search-params';
// Always display these number of pages
// if currentPage is < ALWAYS_DISPLAY_FIRST - 1 and
// totalPages >= ALWAYS_DISPLAY_FIRST
const ALWAYS_DISPLAY_FIRST = 10;

const isActive = (page, selectedPage) => page === selectedPage;
const isFirst = page => page === 1;
const isLast = (page, pageTotal) => page === pageTotal;
const isNonSequential = (page, prevPage) => prevPage !== page - 1;

const isWithinMinimum = (page, currentPage, pageTotal, pageRange) => {
    if (currentPage <= ALWAYS_DISPLAY_FIRST - 1 && page <= ALWAYS_DISPLAY_FIRST) {
        return true;
    }
    if (currentPage >= (pageTotal - pageRange)) {
        if (page >= pageTotal - (pageRange * 2)) {
            return true;
        }
    }
    return false;
};

const isInRange = (page, currentPage, pageTotal, pageRange) => {
    const left = currentPage === pageTotal - pageRange - 1
        ? currentPage - 1
        : currentPage - pageRange;
    const right = currentPage === ALWAYS_DISPLAY_FIRST - 1
        ? 1
        : currentPage + pageRange + 1;

    if (!isWithinMinimum(page, currentPage, pageTotal, pageRange)) {
        return page >= left && page < right;
    }
    return false;
};

const isHidden = (currentPage, pageTotal, pageRange) => {
    // If there are 1 (or fewer) pages
    // If the currentPage is invalid
    // If the pageRange is invalid
    if (pageTotal <= 1 || currentPage < 1 || currentPage > pageTotal || pageRange < 0) {
        return true;
    }
    return false;
};

const getPagination = (currentPage, pageTotal, pageRange) => (
    // Create a new array of length pageTotal
    // .fill is necessary so we can reduce over it
    new Array(pageTotal).fill(0)
        .reduce((pages, _, i) => {
            const page = i + 1;
            if (
                // Add the page if we're on the first/last page
                isFirst(page) ||
                isLast(page, pageTotal) ||
                // or if the page is within the minimum range of the start/end
                isWithinMinimum(page, currentPage, pageTotal, pageRange) ||
                // or if the page falls within our page range
                isInRange(page, currentPage, pageTotal, pageRange)
            ) {
                // Get the previous page
                const prevPage = pages[pages.length - 1];
                // If we're not on the first page and two pages are non-sequential...
                if (prevPage && isNonSequential(page, prevPage)) {
                    // add a break between them
                    pages.push('...');
                }
                // add the page itself
                pages.push(page);
            }
            return pages;
        }, [])
);

/**
 * Find closest number from passed array which is >= totalElements
 * @param {array} options
 * @param {number} totalElements
 * @returns {number | null}
 */
const getViewAllOption = (options, totalElements) =>
    Math.max(...options) < totalElements
        ? null
        : Math.min(...options.filter(option => option >= totalElements));
const getURLFromQueryParams = (url, page, limit) => {
    const [
        base,
        search = '',
    ] = url.split('?');

    const queryParams = [
        ['page', page],
        ['limit', limit],
    ];
    const searchParamsReduced = queryParams.reduce(
        (searchParam, [key, value]) => setSearchParam(searchParam, key, value), search);
    return `${base}?${searchParamsReduced}`;
};

export const setSearchParam = (search, key, value) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set(key, value);
    return searchParams.toString();
};

export {
    getPagination,
    getViewAllOption,
    getURLFromQueryParams,
    isActive,
    isFirst,
    isHidden,
    isInRange,
    isLast,
    isNonSequential,
};
