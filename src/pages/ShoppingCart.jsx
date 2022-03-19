import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    const { products, increaseProductQuantity,
      decreaseProductQuantity, deleteProduct } = this.props;
    products.map((element) => console.log(element.quantity));
    return (
      <div>
        <Link to="/">
          <button type="button">
            Voltar
          </button>
        </Link>
        {products.length > 0 ? products
          .map(({ title, quantity, id, thumbnail, availableQuantityInStock }) => (
            <div key={ title }>
              <p
                data-testid="shopping-cart-product-name"
              >
                {title}
              </p>
              <h2
                data-testid="shopping-cart-product-quantity"
              >
                {quantity}
              </h2>
              <img src={ thumbnail } alt={ title } />
              <button
                type="button"
                name={ id }
                data-testid="product-increase-quantity"
                disabled={ quantity >= availableQuantityInStock }
                onClick={ (e) => increaseProductQuantity(e) }
              >
                +
              </button>
              <button
                type="button"
                name={ id }
                data-testid="product-decrease-quantity"
                onClick={ (e) => decreaseProductQuantity(e) }
              >
                -
              </button>
              <div>
                <button
                  type="button"
                  name={ id }
                  onClick={ (e) => deleteProduct(e) }
                >
                  X
                </button>
              </div>
            </div>
          ))
          : (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) }
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
