import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div>
        {products.length > 0 ? products.map((element) => (
          <div key={ element.title }>
            <p
              data-testid="shopping-cart-product-name"
            >
              {element.title}
            </p>
            <h2
              data-testid="shopping-cart-product-quantity"
            >
              { element.quantity }
            </h2>
          </div>
        ))
          : (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) }
      </div>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
