import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  render() {
    const { cartProducts } = this.props;
    console.log(cartProducts);
    return (
      <div>
        <h1>FINALIZE SUA COMPRA</h1>
        { cartProducts.map((element, index) => (
          <div key={ index }>
            <span>{ element.quantity }</span>
            <img src={ element.thumbnail } alt={ element.title } />
            <h2>{ element.title }</h2>
            <h3>{ element.price }</h3>
          </div>
        ))}
        <form>
          <label htmlFor="name">
            Name
            <input data-testid="checkout-fullname" id="name" type="text" />
          </label>
          <label htmlFor="email">
            Email
            <input data-testid="checkout-email" id="email" type="email" />
          </label>
          <label htmlFor="cpf">
            CPF
            <input data-testid="checkout-cpf" id="cpf" type="text" />
          </label>
          <label htmlFor="telefone">
            Telefone
            <input data-testid="checkout-phone" id="telefone" type="text" />
          </label>
          <label htmlFor="cep">
            CEP
            <input data-testid="checkout-cep" id="cep" type="text" />
          </label>
          <label htmlFor="endereco">
            Endereço
            <input data-testid="checkout-address" id="endereco" type="text" />
          </label>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default Checkout;
