import React from 'react';
import PropTypes from 'prop-types';
import ButtonCart from '../components/ButtonCart';
import { getProducts } from '../services/api';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      infoProduct: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productsArray = await getProducts(id);
    this.setState({ infoProduct: productsArray });
  }

  render() {
    const { infoProduct } = this.state;
    return (
      <div data-testid="product-detail-name">
        <ButtonCart />
        <h1>{ infoProduct.title }</h1>
        <img src={ infoProduct.thumbnail } alt={ infoProduct.title } />
        <p>{ infoProduct.price }</p>
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Products;
