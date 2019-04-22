import React from 'react';
import classNames from 'classnames';

const event = {
    // eslint-disable-next-line no-empty-function
    NOOP: () => {},
    tooltip: {
        HIDE: 'tooltip.hide',
        REBUILD: 'tooltip.rebuild',
        SHOW: 'tooltip.show',
    },
};

const BUTTON = [
    'button',
    'reset',
    'submit',
];

const INPUT = [
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
const MIMETYPE = [
    'application/octet-stream',
    'audio/* ',
    'image/*',
    'text/plain',
    'text/csv',
    'video/*',
];

const SORT = [
    'default',
    'ascending',
    'descending',
];

const attrs = {
    BUTTON,
    INPUT,
    MIMETYPE,
    SORT,
};

const getSortedColumn = (column, sortBy, sortOrder) => {
    let attr = '';

    if (column.sortable && column.id === sortBy) {
        attr += sortOrder;
    }

    return attr;
};

const getTableHeader = (columns, onSort, sortBy, sortOrder) => (
    <thead>
        <tr>
            {columns.map((column, i) => (
                <th
                    key={i}
                    className={column.className}
                    {...column.sortable ? { 'data-sort': getSortedColumn(column, sortBy, sortOrder) } : {}}
                    onClick={() => column.sortable && onSort(column.id)}
                >
                    {column.data}
                </th>
            ))}
        </tr>
    </thead>
);

const getTableFooter = (columns, summary, isLoading, hasData) => {
    if (isLoading || !hasData || !summary.length) {
        return null;
    }

    return (
        <tfoot>
            <tr>
                {summary.map((column, i) => (
                    <th
                        key={i}
                        className={classNames(
                            {[`text-xs-${columns[i].align}`]: columns[i].align},
                            {'text-xs-left': !columns[i].align},
                            columns[i].className
                        )}
                    >
                        {column.data}
                    </th>
                ))}
            </tr>
        </tfoot>
    );
};

const getTableBody = (columns, data, isLoading, noResults) => {
    if (isLoading || !data.length) {
        return (
            <tbody>
                <tr className='no-results'>
                    <td
                        className='text-xs-center'
                        colSpan={columns.length}
                    >
                        <span className={classNames({'is-loading': isLoading})}>
                            {isLoading ? <span className='animate bounce-back-forth infinite' /> : noResults}
                        </span>
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data.map((row, i) => (
                <tr
                    key={i}
                    className={row.className}
                >
                    {getTableData(columns, row)}
                </tr>
            ))}
        </tbody>
    );
};

const getTableData = (columns, row) => columns.map((column, i) => (
    <td
        key={i}
        className={classNames(
            {[`text-xs-${column.align}`]: column.align},
            {'text-xs-left': !column.align},
            column.className
        )}
    >
        {row[column.id]}
    </td>
));

const Table = props => {
    const {
        className,
        columns,
        data,
        id,
        loading,
        noResults,
        onSort,
        sortBy,
        sortOrder,
        summary,
    } = props;

    const classList = classNames('table-responsive', {
        [className]: Boolean(className),
    });

    return (
        <div
            id={id}
            className={classList}
        >
            <table className='table'>
                {getTableHeader(columns, onSort, sortBy, sortOrder)}
                {summary && getTableFooter(columns, summary, loading, Boolean(data.length))}
                {getTableBody(columns, data, loading, noResults)}
            </table>
        </div>
    );
};

Table.defaultProps = {
    className: '',
    id: null,
    loading: false,
    onSort: event.NOOP,
    noResults: 'No Results',
    sortBy: null,
    sortOrder: attrs.SORT[0],
    summary: null,
};

export default Table;
