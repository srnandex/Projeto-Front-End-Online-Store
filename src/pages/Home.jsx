import React from 'react';
import ButtonCart from '../components/ButtonCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';
import ProductCards from '../components/ProductCard';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      categoriesList: [],
      query: '',
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

  productCard = async () => {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(query);
    this.setState({ productsList: results });
  }

  render() {
    const { categoriesList, productsList } = this.state;
    console.log(productsList);
    return (
      <div data-testid="page-not-found">
        <input type="text" data-testid="query-input" onChange={ this.handleChange } />
        <button data-testid="query-button" type="button" onClick={ this.productCard }>
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
            categoriesName={ element.name }
          />
        ))}
        {(productsList.length > 0)
          ? productsList.map((e) => (
            <ProductCards
              key={ e.id }
              title={ e.title }
              thumbnail={ e.thumbnail }
              price={ e.price }
            />
          ))
          : <h2>Nenhum produto foi encontrado</h2>}
      </div>
    );
  }
}

export default Home;
