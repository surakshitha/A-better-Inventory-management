import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = { value: '$' };
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePriceChange(e) {
    const priceValue = e.target.value.substring(1);
    this.setState({ value: `$${priceValue}` });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      category: form.productCategory.value,
      price: form.productPrice.value ? parseFloat(form.productPrice.value.substring(1)) : null,
      name: form.productname.value != null || form.productname.value !== '' ? form.productname.value : null,
      image: form.productimage.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.productCategory.value = 'Shirts';
    this.setState({ value: '$' });
    form.productname.value = '';
    form.productimage.value = '';
  }

  render() {
    const product = this.state;
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <table className="productAddTable">
          <tbody>
            <tr>
              <td className="labels">Category</td>
              <td className="labels">Price Per Unit</td>
            </tr>
            <tr>
              <td>
                <select id="productcategory" name="productCategory" className="inputs" defaultValue="">
                  <option value="" disabled>Choose Category</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
              <td>
                <input type="text" id="productprice" name="productPrice" value={product.value} onChange={this.handlePriceChange} className="inputs" />
              </td>
            </tr>
            <tr>
              <td className="labels">Product Name</td>
              <td className="labels">Image URL</td>
            </tr>
            <tr>
              <td><input type="text" name="productname" placeholder="Product Name" className="inputs" /></td>
              <td><input type="url" name="productimage" placeholder="Image URL" className="inputs" /></td>
            </tr>
          </tbody>
        </table>
        <Button className="button" type="submit">Add Product</Button>
      </form>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

export default ProductAdd;
