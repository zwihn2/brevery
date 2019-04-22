import React from 'react';
import classNames from 'classnames';
import URLSearchParams from 'url-search-params';
import PageItem from './page-item';
import {
    getPagination,
    getURLFromQueryParams,
    getViewAllOption,
    isActive,
    isFirst,
    isHidden,
    isLast,
} from './utils';

const event = {
    // eslint-disable-next-line no-empty-function
    NOOP: () => {},
    tooltip: {
        HIDE: 'tooltip.hide',
        REBUILD: 'tooltip.rebuild',
        SHOW: 'tooltip.show',
    },
};

const DEFAULT_PAGE_RANGE = 2;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const getCurrentPage = url => {
    const [, search] = url.split('?');
    const searchParams = new URLSearchParams(search);
    return searchParams.get('page') ? Number(searchParams.get('page')) : 1;
};

const getPageTotal = (totalElements, pageSize) => Math.ceil(totalElements / pageSize);

const getNextPage = (currentPage, pageTotal) => Math.min(currentPage + 1, pageTotal);

const getPreviousPage = currentPage => Math.max(currentPage - 1, 1);

const getPageItems = (url, onChange, currentPage, pageTotal, pageRange, pageSize) => (
    getPagination(currentPage, pageTotal, pageRange)
        .map((page, i) => {
            const isBreak = Number.isNaN(Number(page));
            if (isBreak) {
                return (
                    <li key={`page-${i + 1}`}>
                        <span className='ellipsis'>
                            &hellip;
                        </span>
                    </li>
                );
            }
            return (
                <PageItem
                    key={`page-${i + 1}`}
                    url={getURLFromQueryParams(url, page, pageSize)}
                    active={isActive(page, currentPage)}
                    onChange={onChange}
                    value={page}
                />
            );
        })
);

const handleArrowClick = (isDisabled, toPage, onChange) => !isDisabled && onChange(toPage);

const getResultsLabel = (currentPage, pageSize, totalElements) => {
    const itemStart = pageSize * (currentPage - 1) + 1;
    const itemEnd = Math.min(pageSize * currentPage, totalElements);

    return `Showing ${itemStart} to ${itemEnd} of ${totalElements} results`;
};

const Pagination = props => {
    const {
        className,
        isDisplayingPageSize,
        onChange,
        onPageSizeChange,
        pageRange,
        pageSize,
        pageSizeOptions,
        totalElements,
        url,
    } = props;

    const classList = classNames('pagination', {
        'hidden-xs-up': !totalElements,
        [className]: Boolean(className),
    });
    const currentPage = getCurrentPage(url);
    const pageTotal = getPageTotal(totalElements, pageSize);
    const nextPage = getNextPage(currentPage, pageTotal);
    const previousPage = getPreviousPage(currentPage);

    const isCurrentPageFirst = isFirst(currentPage);
    const isCurrentPageLast = isLast(currentPage, pageTotal);
    const isPaginationHidden = isHidden(currentPage, pageTotal);

    const viewAllOption = getViewAllOption(pageSizeOptions, totalElements);
    const getPageSize = (pageSize >= viewAllOption) ? (viewAllOption || pageSize) : pageSize;
    const shouldDisplayPageSize = isDisplayingPageSize && Boolean(pageSizeOptions.length);
    return (
        <div className='flex-row pagination dropup p-r-1'>
            <div className='flex-col align-items-xs-center justify-content-xs-end'>
                <p className={classNames('font-size-sm text-muted m-b-0', { 'm-r-1': shouldDisplayPageSize })}>
                    {getResultsLabel(currentPage, pageSize, totalElements)}
                </p>
                <nav className={classNames('m-l-1', { 'hidden-xs-up': isPaginationHidden })}>
                    <ul>
                        <li>
                            <a
                                className='arrow-left arrow-square'
                                href={getURLFromQueryParams(url, previousPage, pageSize)}
                                disabled={isCurrentPageFirst}
                                onClick={() => handleArrowClick(isCurrentPageFirst, previousPage, onChange)}
                            >
                                <span
                                    className='icon'
                                    aria-hidden='true'
                                />
                                <span className='sr-only'>Previous</span>
                            </a>
                        </li>
                        {getPageItems(url, onChange, currentPage, pageTotal, pageRange, pageSize)}
                        <li>
                            <a
                                className='arrow-right arrow-square'
                                href={getURLFromQueryParams(url, nextPage, pageSize)}
                                disabled={isCurrentPageLast}
                                onClick={() => handleArrowClick(isCurrentPageLast, nextPage, onChange)}
                            >
                                <span
                                    className='icon'
                                    aria-hidden='true'
                                />
                                <span className='sr-only'>Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

Pagination.defaultProps = {
    className: '',
    isDisplayingPageSize: true,
    onPageSizeChange: event.NOOP,
    pageRange: DEFAULT_PAGE_RANGE,
    pageSize: DEFAULT_PAGE_SIZE,
    pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
};

export default Pagination;
