import * as React from 'react';
import { connect } from 'react-redux';
import ItemToolbar from 'components/containers/item/item-toolbar';
import ItemSummary from 'components/containers/item/item-summary';
import {
    itemSelectId,
} from 'actions/item-actions';

class ItemPage extends React.Component {
    componentDidMount () {
        this.props.itemSelectId(this.props.match.params.id);
    }
    render () {
        return (
            <main className='main' id='main'>
                <ItemToolbar />
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            <ItemSummary id={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapDispatchToProps = {
    itemSelectId,
};

export default connect(null, mapDispatchToProps)(ItemPage);
