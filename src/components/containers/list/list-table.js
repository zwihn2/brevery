// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from 'components/basic/pagination/index';
import Table from 'components/basic/table';
import {
    PAGE_SIZE_OPTIONS,
} from 'constants/basic';
import {
    listGetRequest,
    listPageSelect,
    listPageSizeSelect,
    listSort,
} from 'actions/list-actions';
import {
    sortData,
} from 'helpers/sort-helpers';

class ListTable extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            tableData: props.content,
            page: props.listFilters.page,
            limit: props.listFilters.limit,
        };
    }

    componentDidMount () {
        this.props.listGetRequest();
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            tableData: nextProps.content,
            page: nextProps.listFilters.page,
            limit: nextProps.listFilters.limit,
        });
    }

    handleSort = sortBy => {
        this.props.listSort(sortBy);
        this.props.listGetRequest();
        const tableData = sortData(this.state.tableData, this.props.listFilters.sortBy, this.props.listFilters.sortOrder);
        this.setState({
            tableData,
        });
    };

    handlePage = num => {
        this.props.listPageSelect(num);
        this.setState({
            page: num,
        });
    }

    handlePageSize = num => {
        this.props.listPageSelect(1);
        this.props.listPageSizeSelect(num);
        this.setState({
            page: 1,
            limit: num,
        });
    }

    render () {
        const { tableData, page, limit } = this.state;

        const columns = [
            { className: 'text-xs-break-word', data: 'Name', id: 'name', sortable: true },
            { align: 'left', data: 'City', id: 'city', sortable: true },
            { align: 'left', data: 'Street', id: 'street', sortable: true },
            { align: 'left', data: 'State', id: 'state', sortable: true },
            { align: 'left', data: 'Country', id: 'country', sortable: true },
            { align: 'left', data: 'Phone', id: 'phone', sortable: true },
            { align: 'left', data: 'Tags', id: 'tag_list', sortable: true },
        ];

        const {
            isListLoading,
            listFilters,
        } = this.props;

        const dataAll = tableData.map((item, index) => ({
            className: 'test',
            name: (
                <Link
                    className='text-xs-break-word'
                    to={`/${item.id}`}
                >
                    {item.name}
                </Link>
            ),
            city: item.city,
            street: item.street,
            state: item.state,
            country: item.country,
            phone: item.phone,
            tag_list: item.tag_list.join(' ,'),
        }));

        const data = dataAll.slice((page - 1) * limit, page * limit);

        return (
            <div>
                <div className='row m-b-3'>
                    <div className='col-xs-12'>
                        <Table
                            className='font-size-sm list-table m-b-2'
                            columns={columns}
                            data={data}
                            loading={isListLoading}
                            sortOrder={listFilters.sortOrder}
                            sortBy={listFilters.sortBy}
                            onSort={this.handleSort}
                        />
                    </div>
                    <div className='col-xs-12'>
                        {!isListLoading &&
                            <div className='flex-row justify-content-xs-end m-r-1'>
                                <button
                                    className={`btn btn-tertiary d-xs-block m-r-half${limit === 5 ? ' active' : ''}`}
                                    type='button'
                                    onClick={() => this.handlePageSize(5)}
                                >
                                    5 per page
                                </button>
                                <button
                                    className={`btn btn-tertiary d-xs-block m-r-half${limit === 10 ? ' active' : ''}`}
                                    type='button'
                                    onClick={() => this.handlePageSize(10)}
                                >
                                    10 per page
                                </button>
                                <button
                                    className={`btn btn-tertiary d-xs-block${limit === 20 ? ' active' : ''}`}
                                    type='button'
                                    onClick={() => this.handlePageSize(20)}
                                >
                                    20 per page
                                </button>
                                <Pagination
                                    className='dropup p-r-1'
                                    onChange={this.handlePage}
                                    pageSize={limit}
                                    pageTotal={Math.ceil(tableData.length / limit)}
                                    totalElements={tableData.length}
                                    url={`javascript:void(0);//?page=${page}`}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isListLoading: state.list.isListLoading,
        content: state.list.content,
        listFilters: state.list.filters,
    }
);

const mapDispatchToProps = {
    listGetRequest,
    listPageSelect,
    listPageSizeSelect,
    listSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTable);
