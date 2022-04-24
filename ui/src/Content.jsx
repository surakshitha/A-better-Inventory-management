import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductImage from './ProductImage.jsx';

const NotFound = () => <h4>404: Page Not Found</h4>;

const Content = () => (
  <>
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/image/:id" component={ProductImage} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Content;
