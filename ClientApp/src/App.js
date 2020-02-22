import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchCustomers } from './components/customers/FetchCustomers';
import { FetchProducts } from './components/products/FetchProducts';
import { FetchStores } from './components/stores/FetchStores';
import { FetchSales } from './components/sales/FetchSales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={FetchCustomers} />
            <Route path='/fetch-customers' component={FetchCustomers} />
            <Route path='/fetch-products' component={FetchProducts} />
            <Route path='/fetch-stores' component={FetchStores} />
            <Route path='/fetch-sales' component={FetchSales} />
      </Layout>
    );
  }
}
