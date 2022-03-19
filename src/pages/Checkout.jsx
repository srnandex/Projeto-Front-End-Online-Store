import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  render() {
    const { cartProducts } = this.props;
    console.log(cartProducts);
    return (
      <div>
        <Link to="/ShoppingCart">
          <button type="button" className="buttonReturnCart">
            Voltar para o carrinho
          </button>
        </Link>
        <h1 className="checkoutTitle">FINALIZE SUA COMPRA</h1>
        { cartProducts.map((element, index) => (
          <div key={ index }>
            <span className="checkoutQuantity">{ element.quantity }</span>
            <img
              className="checkoutImage"
              src={ element.thumbnail }
              alt={ element.title }
            />
            <h2 className="checkoutTitle">{ element.title }</h2>
            <h3 className="checkoutPrice">{ element.price }</h3>
          </div>
        ))}
        <h1 className="checkoutTitle">Preencha seus dados</h1>
        <div>
          <form className="formCheckout">
            <label htmlFor="name">
              Nome:
              <input data-testid="checkout-fullname" id="name" type="text" />
            </label>
            <br />
            <label htmlFor="email">
              Email:
              <input data-testid="checkout-email" id="email" type="email" />
            </label>
            <br />
            <label htmlFor="cpf">
              CPF:
              <input data-testid="checkout-cpf" id="cpf" type="text" />
            </label>
            <br />
            <label htmlFor="telefone">
              Telefone:
              <input data-testid="checkout-phone" id="telefone" type="text" />
            </label>
            <br />
            <label htmlFor="cep">
              CEP:
              <input data-testid="checkout-cep" id="cep" type="text" />
            </label>
            <br />
            <label htmlFor="endereco">
              Endereço:
              <input data-testid="checkout-address" id="endereco" type="text" />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default Checkout;
