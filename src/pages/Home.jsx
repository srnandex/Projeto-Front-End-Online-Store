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
    const { productLists, categoriesProduct, categoryId,
      handle, productCard, saveCart, categoriesResults, cartQuantity } = this.props;
    console.log(this.props);
    const { categoriesList } = this.state;
    console.log(productLists);
    console.log(categoriesProduct);
    console.log(categoryId);
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
        {(categoriesProduct.length > 0
        && productLists.length === 0) && categoriesProduct.map((eleme) => (
          <ProductCards
            key={ eleme.id }
            title={ eleme.title }
            thumbnail={ eleme.thumbnail }
            price={ eleme.price }
            id={ eleme.id }
            saveProduct={ saveCart }
          />
        ))}
        {(productLists.length > 0
        && categoriesProduct.length === 0) && productLists.map((k) => (
          <ProductCards
            key={ k.id }
            title={ k.title }
            thumbnail={ k.thumbnail }
            price={ k.price }
            id={ k.id }
            saveProduct={ saveCart }
          />
        ))}
        {(categoriesProduct.length > 0
        && productLists.length > 0)
        && categoriesProduct.map((y) => (
          <ProductCards
            key={ y.id }
            title={ y.title }
            thumbnail={ y.thumbnail }
            price={ y.price }
            id={ y.id }
            saveProduct={ saveCart }
          />
        ))}
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  productLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoriesProduct: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryId: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  productCard: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
  categoriesResults: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
};
