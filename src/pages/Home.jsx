import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonCart from '../components/ButtonCart';
import { getCategories,
  /* getProductsFromCategoryAndQuery */
  /* getProductsCategories */ } from '../services/api';
// import { saveProducts } from '../services/saveProducts';
import Categories from '../components/Categories';
import ProductCards from '../components/ProductCard';

const Wrapper = styled.div`
  display: flex;
`;

const StyledCategories = styled.div`
  position: fixed;
  border: 10px solid beige;
  border-radius: 1rem;
  background-color: RGB(255, 252, 245);
  width: 18rem;
`;

const StyledContainerProducts = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-left: 17rem;
`;

const Search = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 50%;
  height: 6rem;
  margin: auto;
`;

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriesList: [],
    };
  }

  async componentDidMount() {
    const categoriesArray = await getCategories();

    this.setState({ categoriesList: categoriesArray });
  }

  render() {
    const { categoriesProduct,
      handle, productCard, saveCart, categoriesResults, cartQuantity } = this.props;
    // console.log(this.props);
    const { categoriesList } = this.state;
    console.log(categoriesProduct);
    return (
      <div data-testid="page-not-found">
        <Search>
          <input
            style={ { borderRadius: '50px', width: '550px' } }
            type="text"
            data-testid="query-input"
            onChange={ handle }
          />
          <button
            style={ { borderRadius: '5px', width: '150px', cursor: 'pointer' } }
            data-testid="query-button"
            type="button"
            onClick={ () => categoriesResults() }
          >
            Pesquisar
          </button>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </Search>
        <ButtonCart cartQuantity={ cartQuantity } />
        <Wrapper>
          <StyledCategories>
            {categoriesList.map((element) => (
              <Categories
                key={ element.id }
                categoriesId={ element.id }
                categoriesName={ element.name }
                categoriesResults={ productCard }
              />
            ))}
          </StyledCategories>
          <StyledContainerProducts>
            {categoriesProduct.map((element) => (
              <ProductCards
                key={ element.id }
                title={ element.title }
                thumbnail={ element.thumbnail }
                price={ element.price }
                id={ element.id }
                saveProduct={ saveCart }
                freeShipping={ element.shipping.free_shipping }
                // quantity={ element.available_quantity }
              />
            ))}
          </StyledContainerProducts>
        </Wrapper>
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  categoriesProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  handle: PropTypes.func.isRequired,
  productCard: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
  categoriesResults: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
};
