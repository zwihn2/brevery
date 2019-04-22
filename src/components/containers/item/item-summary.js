import * as React from 'react';
import { connect } from 'react-redux';
import Table from 'components/basic/table';
import {
    itemGetRequest,
} from 'actions/item-actions';

class ItemSummary extends React.Component {

    componentDidMount () {
        this.props.itemGetRequest(this.props.id);
    }
    render () {
        const {
            isItemLoading,
            data,
        } = this.props;

        const columns = [
            { className: 'text-xs-break-word', data: 'Property', id: 'name', sortable: false },
            { align: 'left', data: 'Value', id: 'value', sortable: false },
        ];

        let dataColumns = [
            { name: '-----', value: '-----' },
        ];

        if (data) {
            dataColumns = [
                { name: 'id', value: data.id },
                { name: 'name', value: data.name},
                { name: 'brewery_type', value: data.brewery_type},
                { name: 'street', value:  data.street},
                { name: 'city', value:  data.city},
                { name: 'state', value:  data.state},
                { name: 'postal_code', value:  data.postal_code},
                { name: 'country', value:  data.country},
                { name: 'longitude', value:  data.longitude},
                { name: 'latitude', value:  data.latitude},
                { name: 'phone', value:  data.phone},
                { name: 'website_url', value:  data.website_url},
                { name: 'updated_at', value:  data.updated_at},
                { name: 'tag_list', value:  data.tag_list.join(', ')},
            ];
        }

        return (
            <div className='summary-wrap'>
                <h3 className='summary-title'>{data ? data.name : '-----'}</h3>
                <div className='row m-b-3'>
                    <div className='col-xs-12'>
                        <Table
                            className='font-size-sm list-table'
                            columns={columns}
                            data={dataColumns}
                            loading={isItemLoading}
                            sortBy='name'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isItemLoading: state.item.isItemLoading,
        data: state.item.data,
    }
);

const mapDispatchToProps = {
    itemGetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSummary);
