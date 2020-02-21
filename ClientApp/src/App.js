import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCustomers } from './components/customers/FetchCustomers';
import { FetchProducts } from './components/products/FetchProducts';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={FetchCustomers} />
            <Route path='/fetch-customers' component={FetchCustomers} />
            <Route path='/fetch-products' component={FetchProducts} />
      </Layout>
    );
  }
}
