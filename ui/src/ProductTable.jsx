import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, OverlayTrigger, Table, Tooltip,
} from 'react-bootstrap';

const ProductRow = withRouter(({
  product, deleteProduct, index, location: { search },
}) => {
  const selectLocation = { pathname: `/products /${product.id}`, search };
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete</Tooltip>
  );
  const editTooltip = (
    <Tooltip id="edit-tooltip" placement="top">Edit</Tooltip>
  );
  const viewTooltip = (
    <Tooltip id="view-tooltip" placement="top">View Image</Tooltip>
  );
  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }
  const tableRow = (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.price ? `$${product.price}` : ''}</td>
        <td>{product.category}</td>
        <td>
          <LinkContainer to={`/image/${product.id}`}>
            <OverlayTrigger delayShow={100} overlay={viewTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="eye-open" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
        </td>
        <td>
          <LinkContainer to={`/edit/${product.id}`}>
            <OverlayTrigger delayShow={200} overlay={editTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="edit" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          <OverlayTrigger delayShow={200} overlay={deleteTooltip}>
            <Button bsSize="xsmall" onClick={onDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    </>
  );

  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
});

function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows.length > 0 ? productRows : <tr><td colSpan="5">No records to display</td></tr>}
      </tbody>
    </Table>
  );
}

export default ProductTable;
