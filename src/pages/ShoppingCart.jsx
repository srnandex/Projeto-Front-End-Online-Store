import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from '../devices/devices';

const ButtonStyled = styled.button`
  background-color: #f8961e;
  border-color: #f8961e;
  border-radius: 15px;
  cursor: pointer;
  margin: 15px;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  @media screen ${device.mobileL} {
    display: block;
  }

  @media screen ${device.mobileM} {
    display: block;
  }
`;

const ProductContainer = styled.div`
  background-color: #B7B734;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0.2rem;
  border: 0.7rem solid beige;
  border-radius: 3rem;
  width: 35%;
  transition: transform 500ms ease;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  @media screen ${device.mobileL} {
    width: 50vh;
    margin: 0 auto;
    height: auto;
  }

  @media screen ${device.mobileM} {
    width: 43vh;
  }
`;

const ImageDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  background-size: cover;
`;

const ButtonWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const DeleteButton = styled.div`
  justify-content: center;
  display: flex;
`;

class ShoppingCart extends React.Component {
  render() {
    const { products, increaseProductQuantity,
      decreaseProductQuantity, deleteProduct } = this.props;
    products.map((element) => console.log(element.quantity));
    return (
      <div>
        <Link to="/">
          <ButtonStyled
            type="button"
          >
            Voltar para o carrinho
          </ButtonStyled>
        </Link>
        <Wrapper>
          {products.length > 0 ? products
            .map(({ title, quantity, id, thumbnail, availableQuantityInStock }) => (
              <ProductContainer key={ title }>
                <h2
                  data-testid="shopping-cart-product-name"
                  style={ { color: '#ff006d',
                    fontFamily: 'Playfair Display , serif;',
                    fontSize: '25px',
                    margin: '15px' } }
                >
                  {title}
                </h2>
                <span
                  data-testid="shopping-cart-product-quantity"
                  style={ { color: '#ff006d',
                    fontFamily: 'Playfair Display , serif;',
                    fontSize: '25px',
                    margin: '15px' } }
                >
                  Quantidade:
                  {' '}
                  {quantity}
                </span>
                <ImageDiv>
                  <img
                    src={ thumbnail }
                    alt={ title }
                    height="200"
                  />
                </ImageDiv>
                <ButtonWrapper>
                  <ButtonStyled
                    type="button"
                    name={ id }
                    data-testid="product-increase-quantity"
                    disabled={ quantity >= availableQuantityInStock }
                    onClick={ (e) => increaseProductQuantity(e) }
                    style={ { width: '60px' } }
                  >
                    +
                  </ButtonStyled>
                  <ButtonStyled
                    type="button"
                    name={ id }
                    data-testid="product-decrease-quantity"
                    onClick={ (e) => decreaseProductQuantity(e) }
                    style={ { width: '60px' } }
                  >
                    -
                  </ButtonStyled>
                </ButtonWrapper>
                <DeleteButton>
                  <ButtonStyled
                    type="button"
                    name={ id }
                    onClick={ (e) => deleteProduct(e) }
                    style={ { width: '60px' } }
                  >
                    X
                  </ButtonStyled>
                </DeleteButton>
              </ProductContainer>
            ))
            : (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            ) }
        </Wrapper>
        <Link to="/checkout">
          <ButtonStyled
            data-testid="checkout-products"
            type="button"
          >
            Finalizar Compra

          </ButtonStyled>
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
