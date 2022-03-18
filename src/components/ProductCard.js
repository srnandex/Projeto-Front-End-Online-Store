import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

class ProductCards extends React.Component {
  render() {
    const { title, thumbnail, price, id, saveProduct, freeShipping } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/products/${id}` } data-testid="product-detail-link">
          <h1>{title}</h1>
        </Link>
        {freeShipping
        && (
          <span data-testid="free-shipping">
            <FaTruck />
            Free shipping
          </span>
        )}
        <div className="img-product-card">
          <img src={ thumbnail } alt={ title } />
        </div>
        <p>{price}</p>
        <button
          type="button"
          name={ id }
          data-testid="product-add-to-cart"
          onClick={ (e) => saveProduct(e) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCards.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductCards;
