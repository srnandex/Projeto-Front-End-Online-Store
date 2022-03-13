import React from 'react';
import PropTypes from 'prop-types';
import ButtonCart from '../components/ButtonCart';
import { getProducts } from '../services/api';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      productSpecs: [],
      infoDetails: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { attributes } = await getProducts(id);
    const productDetails = await getProducts(id);
    this.setState({ productSpecs: attributes, infoDetails: productDetails });
  }

  render() {
    const { productSpecs, infoDetails } = this.state;
    const { match: { params: { id } }, saveCart } = this.props;
    return (
      <>
        <div data-testid="product-detail-name">
          <ButtonCart />
          <h1>{ infoDetails.title }</h1>
          <img src={ infoDetails.thumbnail } alt={ infoDetails.title } />
          <h3>{infoDetails.price}</h3>
          {productSpecs.length > 0 && productSpecs.map((element) => (
            <h1 key={ element.name }>
              {(element.name)}
              :
              {(element.value_name)}
            </h1>
          ))}
        </div>
        <button
          type="button"
          name={ id }
          data-testid="product-detail-add-to-cart"
          onClick={ (e) => saveCart(e) }
        >
          Adicionar ao carrinho
        </button>
      </>
    );
  }
}
Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  saveCart: PropTypes.func.isRequired,
};
export default Products;
