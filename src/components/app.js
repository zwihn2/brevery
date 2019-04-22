import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ListPage from 'components/containers/list/list-page';
import ItemPage from 'components/containers/item/item-page';

export const App = () => (
    <Switch>
        <Route
            component={ListPage}
            exact
            path='/'
        />
        <Route
            exact
            path='/:id'
            component={ItemPage}
        />
    </Switch>
);

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(App);
