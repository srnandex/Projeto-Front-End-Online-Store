import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 40%;
  margin: 0.2rem;
  background-color: #B7B734;
  border: 0.7rem solid beige;
  border-radius: 3rem;
  transition: transform 500ms ease;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  color: #ff006d;
  cursor: pointer;
`;

const ImageDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  background-size: cover;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 10px;
  background-color: orange;
  height: 40px;
  width: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const WrapperTitle = styled.div`
  height: 12rem;
  text-align: center;
`;

class ProductCards extends React.Component {
  render() {
    const { title, thumbnail, price, id, saveProduct, freeShipping } = this.props;
    return (
      <StyledCard data-testid="product">
        <WrapperTitle>
          <Link
            to={ `/products/${id}` }
            style={ { textDecoration: 'none' } }
            data-testid="product-detail-link"
          >
            <Title text-decoration="none!important">{title}</Title>
          </Link>
          {freeShipping
        && (
          <span data-testid="free-shipping">
            <FaTruck />
            Frete Grátis
          </span>
        )}
        </WrapperTitle>
        <ImageDiv className="img-product-card">
          <img height="200" src={ thumbnail } alt={ title } />
        </ImageDiv>
        <Wrapper>
          <p style={ { color: '#ff006d' } }>
            R$
            {price}
          </p>
        </Wrapper>
        <Wrapper>
          <Button
            type="button"
            name={ id }
            data-testid="product-add-to-cart"
            onClick={ (e) => saveProduct(e) }
          >
            Adicionar ao carrinho
          </Button>
        </Wrapper>
      </StyledCard>
    );
  }
}

ProductCards.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductCards;
