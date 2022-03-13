import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      productLists: [],
      categoriesProduct: [],
      categoryId: '',
      query: '',
      savedProducts: [],
    };
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
      productLists: results,
      categoryId: value },
    () => this.categoriesResults());
  }

  categoriesResults = async () => {
    const { query, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ categoriesProduct: results });
  };

  saveCart = ({ target: { name } }) => {
    const { categoriesProduct, productLists } = this.state;
    console.log(productLists);
    if (categoriesProduct && productLists) {
      const produtosPorCategoria = productLists.find(({ id }) => id === name);
      produtosPorCategoria.quantity = 1;
      this.setState((prevState) => ({
        savedProducts: [...prevState.savedProducts, produtosPorCategoria],
      }));
    }
  }

  render() {
    const { savedProducts, categoryId, productLists } = this.state;
    console.log(savedProducts);

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => (<Home
                { ...this.state }
                handle={ this.handleChange }
                productCard={ this.productCard }
                categoriesResults={ this.categoriesResults }
                saveCart={ this.saveCart }
              />)
            }
          />
          <Route
            exact
            path="/shoppingCart"
            render={
              () => (<ShoppingCart
                categoryId={ categoryId }
                products={ savedProducts }
                productList={ productLists }
                increaseProduct={ this.increaseProduct }
              />)
            }
          />
          <Route
            exact
            path="/products/:id"
            render={
              (props) => (<Products
                { ...props }
                saveCart={ this.saveCart }
                products={ savedProducts }
              />)
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
