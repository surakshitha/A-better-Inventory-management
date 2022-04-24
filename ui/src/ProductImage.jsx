import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!) {
      product(id: $id) {
        id 
        name
        image
      }
    }`;

    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ product: data.product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        {product.image !== ''
          ? <h3>Showing product image for:</h3>
          : <p>Image not available for this product:</p>

        }
        <h5>{product.name}</h5>
        {product.image !== ''
          ? <img src={product.image} alt={product.name} width="500" height="600" />
          : (
            <div>
              Click here to add image details
              {' '}
              <Link to={`/edit/${product.id}`}>Modify Product</Link>
            </div>
          )
        }
      </div>
    );
  }
}
