import React from 'react';
import ButtonCart from '../components/ButtonCart';
import { getCategories,
  getProductsFromCategoryAndQuery,
  getProductsCategories } from '../services/api';
import Categories from '../components/Categories';
import ProductCards from '../components/ProductCard';

class Home extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      productsList: [],
      categoriesProduct: [],
      categoriesList: [],
      query: '',
      categoryId: '',
    };
  }

  async componentDidMount() {
    const categoriesArray = await getCategories();

    this.setState({ categoriesList: categoriesArray });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  productCard = async ({ target: { value } }) => {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(value, query);
    this.setState({
      productsList: results,
      categoryId: value },
    () => this.categoriesResults());
  }

  categoriesResults = async () => {
    const { query, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ categoriesProduct: results });
  };

  render() {
    const { categoriesList, productsList, categoriesProduct, categoryId } = this.state;
    // console.log(categoriesProduct);
    console.log(categoryId);
    return (
      <div data-testid="page-not-found">
        <input type="text" data-testid="query-input" onChange={ this.handleChange } />
        <button
          data-testid="query-button"
          type="button"
          onClick={ () => this.categoriesResults() }
        >
          Pesquisar
        </button>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <ButtonCart />
        {categoriesList.map((element) => (
          <Categories
            key={ element.id }
            categoriesId={ element.id }
            categoriesName={ element.name }
            categoriesResults={ this.productCard }
          />
        ))}
        {(categoriesProduct.length > 0
        && productsList.length === 0) && categoriesProduct.map((eleme) => (
          <ProductCards
            key={ eleme.id }
            title={ eleme.title }
            thumbnail={ eleme.thumbnail }
            price={ eleme.price }
            id={ eleme.id }
          />
        ))}
        {(productsList.length > 0
        && categoriesProduct.length === 0) && productsList.map((k) => (
          <ProductCards
            key={ k.id }
            title={ k.title }
            thumbnail={ k.thumbnail }
            price={ k.price }
            id={ k.id }
          />
        ))}
        {(categoriesProduct.length > 0
        && productsList.length > 0)
        && categoriesProduct.map((y) => (
          <ProductCards
            key={ y.id }
            title={ y.title }
            thumbnail={ y.thumbnail }
            price={ y.price }
            id={ y.id }
          />
        ))}
      </div>
    );
  }
}

export default Home;
