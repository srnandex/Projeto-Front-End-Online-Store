import React from 'react';
import ButtonCart from '../components/ButtonCart';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
        <ButtonCart />
      </div>
    );
  }
}

export default ShoppingCart;
