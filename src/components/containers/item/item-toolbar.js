import * as React from 'react';
import { Link } from 'react-router-dom';

export const ItemToolbar = () => (
    <div className='container item-toolbar'>
        <div className='row m-b-1'>
            <div className='col-xs-12'>
                <Link
                    className='btn btn-tertiary'
                    data-name='back-button'
                    to={'/'}
                >
                    Back
                </Link>
            </div>
        </div>
    </div>
);

export default ItemToolbar;
