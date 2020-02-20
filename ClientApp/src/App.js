import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCustomer } from './components/customer/FetchCustomer';
import { AddCustomer } from './components/customer/AddCustomer';
import { ListingTable } from './components/ListingTable';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/fetch-customer' component={FetchCustomer} />
            <Route path='/add-customer' component={AddCustomer} />
            <Route path='/table-listing' component={ListingTable}/>
      </Layout>
    );
  }
}
