import React from 'react';
import PropTypes from 'prop-types';
import ButtonCart from '../components/ButtonCart';
import { getCategories,
  /* getProductsFromCategoryAndQuery */
  /* getProductsCategories */ } from '../services/api';
// import { saveProducts } from '../services/saveProducts';
import Categories from '../components/Categories';
import ProductCards from '../components/ProductCard';

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
        <input type="text" data-testid="query-input" onChange={ handle } />
        <button
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
        <ButtonCart cartQuantity={ cartQuantity } />
        {categoriesList.map((element) => (
          <Categories
            key={ element.id }
            categoriesId={ element.id }
            categoriesName={ element.name }
            categoriesResults={ productCard }
          />
        ))}
        {categoriesProduct.map((element) => (
          <ProductCards
            key={ element.id }
            title={ element.title }
            thumbnail={ element.thumbnail }
            price={ element.price }
            id={ element.id }
            saveProduct={ saveCart }
            freeShipping={ element.shipping.free_shipping }
          />
        ))}
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
