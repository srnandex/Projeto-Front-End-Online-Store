import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import { getProductsFromCategoryAndQuery } from './services/api';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.increaseProductQuantity = this.increaseProductQuantity.bind(this);
    this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      categoriesProduct: [],
      categoryId: '',
      query: '',
      savedProducts: [],
      cartQuantity: 0,
    };
  }

  componentDidMount() {
    const retrievedCartNumber = JSON.parse(localStorage.getItem('cartNumber'));
    this.setState({ cartQuantity: retrievedCartNumber });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  productCard = async ({ target: { value } }) => {
    this.setState({
      categoryId: value },
    () => this.categoriesResults());
  }

  categoriesResults = async () => {
    const { query, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ categoriesProduct: results });
  };

  saveCart = ({ target: { name } }) => {
    const { savedProducts, categoriesProduct } = this.state;
    if (categoriesProduct) {
      const desiredProduct = categoriesProduct.find(({ id }) => id === name);
      const productAlreadyInTheCart = savedProducts.find(({ id }) => id === name);
      if (productAlreadyInTheCart) {
        productAlreadyInTheCart.quantity += 1;
        this.setState({ savedProducts }, () => this.increaseCartLength());
      }
      if (!productAlreadyInTheCart) {
        const availableQuantityInStock = desiredProduct.available_quantity;
        this.setState((prevState) => ({
          savedProducts: [...prevState.savedProducts,
            { ...desiredProduct, quantity: 1, availableQuantityInStock }],
        }), () => this.increaseCartLength());
      }
    }
  }

  increaseCartLength = () => {
    this.setState((prevState) => ({
      cartQuantity: prevState.cartQuantity + 1,
    }), () => {
      const { cartQuantity } = this.state;
      localStorage.setItem('cartNumber', JSON.stringify(cartQuantity));
    });
  }

  increaseProductQuantity({ target: { name } }) {
    const { savedProducts } = this.state;
    const productAlreadyInTheCart = savedProducts.find(({ id }) => id === name);
    if (productAlreadyInTheCart) {
      savedProducts.find((element) => element.id === name).quantity += 1;
    }
    this.setState({ savedProducts });
  }

  decreaseProductQuantity({ target: { name } }) {
    const { savedProducts } = this.state;
    const productAlreadyInTheCart = savedProducts.find(({ id }) => id === name);
    if (productAlreadyInTheCart) {
      const productQuantity = productAlreadyInTheCart.quantity;
      const minimumQuantity = 1;
      if (productQuantity > minimumQuantity) {
        savedProducts.find(({ id }) => id === name).quantity -= 1;
      }
      this.setState({ savedProducts });
    }
  }

  deleteProduct({ target: { name } }) {
    const { savedProducts } = this.state;
    const productToBeRemoved = savedProducts.filter(({ id }) => id !== name);
    this.setState({ savedProducts: productToBeRemoved });
  }

  render() {
    const { savedProducts, categoryId, cartQuantity, categoriesProduct } = this.state;
    console.log(categoriesProduct);
    console.log(savedProducts);
    console.log(cartQuantity);

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
                increaseProductQuantity={ this.increaseProductQuantity }
                decreaseProductQuantity={ this.decreaseProductQuantity }
                deleteProduct={ this.deleteProduct }
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
                cartQuantity={ cartQuantity }
              />)
            }
          />
          <Route
            exact
            path="/checkout"
            render={
              () => (
                <Checkout
                  cartProducts={ savedProducts }
                />)
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
