import React from 'react';
import { Link } from 'react-router-dom';

class ButtonCart extends React.Component {
  render() {
    return (
      <Link to= "/shoppingCart">
        <button data-testid="shopping-cart-button">
          Carrinho
        </button>
      </Link>
    );
  }
}

export default ButtonCart;