// @flow
import * as React from 'react';
import ListToolbar from 'components/containers/list/list-toolbar';
import ListTable from 'components/containers/list/list-table';

const ListPage = () => (
    <main className='main' id='main'>
        <div className='container'>
            <ListToolbar />
            <div className='row'>
                <div className='col-xs-12'>
                    <ListTable />
                </div>
            </div>
        </div>
    </main>
);
export default ListPage;
