import React from 'react';
import ButtonCart from '../components/ButtonCart';
import { getCategories } from '../services/api';
import Categories from '../components/Categories';

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
    const { categoriesList } = this.state;
    console.log(categoriesList);
    return (
      <div data-testid="page-not-found">
        <input type="text" />
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
      </div>
    );
  }
}

export default Home;
