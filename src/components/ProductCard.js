import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCards extends React.Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <Link to={ `/products/${id}` } data-testid="product-detail-link">
        <div data-testid="product">
          <h1>{title}</h1>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </div>
      </Link>
    );
  }
}

ProductCards.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductCards;
