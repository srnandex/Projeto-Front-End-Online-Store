import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

class ButtonCart extends React.Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <Link to="/shoppingCart">
        <button
          className="buttonCart"
          type="button"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart />
        </button>
        <span
          data-testid="shopping-cart-size"
        >
          { cartQuantity }
        </span>
      </Link>
    );
  }
}

ButtonCart.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};
export default ButtonCart;
