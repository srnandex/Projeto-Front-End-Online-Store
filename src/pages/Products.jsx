import React from 'react';
import PropTypes from 'prop-types';
import { FaTruck, FaStar } from 'react-icons/fa';
import ButtonCart from '../components/ButtonCart';
import { getProducts } from '../services/api';

class Products extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);

    this.state = {
      productSpecs: [],
      infoDetails: [],
      email: '',
      avaliacoes: [],
      description: '',
      shipping: [],
      rating: 0,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { attributes, shipping } = await getProducts(id);
    const productDetails = await getProducts(id);
    this.setState({ productSpecs: attributes, infoDetails: productDetails, shipping });
    const retrievedUserInput = JSON.parse(localStorage.getItem('userInput'));
    if (retrievedUserInput !== null) {
      this.setState({ avaliacoes: retrievedUserInput });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleButton(e) {
    e.preventDefault();
    const { rating, email, description } = this.state;
    console.log(rating, email);
    this.setState((prevState) => ({
      avaliacoes: [...prevState.avaliacoes, { rating, email, description }],
    }), () => {
      const { avaliacoes } = this.state;
      localStorage.setItem('userInput', JSON.stringify(avaliacoes));
    });
    this.setState({
      rating: '',
      email: '',
      description: '',
    });
  }

  render() {
    const { productSpecs, infoDetails, shipping, rating } = this.state;
    const ratingArrayLength = 5;
    const { avaliacoes } = this.state;
    const { match: { params: { id } },
      saveCart, cartQuantity } = this.props;
    const { email, description } = this.state;

    return (
      <>
        <div data-testid="product-detail-name">
          <ButtonCart cartQuantity={ cartQuantity } />
          <h1>{ infoDetails.title }</h1>
          <img src={ infoDetails.thumbnail } alt={ infoDetails.title } />
          {shipping.free_shipping
          && (
            <span>
              Frete Grátis
              <FaTruck />
            </span>
          )}
          <h3>{infoDetails.price}</h3>
          {productSpecs.length > 0 && productSpecs.map((element) => (
            <h1 key={ element.name }>
              {(element.name)}
              :
              {(element.value_name)}
            </h1>
          ))}
        </div>
        <button
          type="button"
          name={ id }
          data-testid="product-detail-add-to-cart"
          onClick={ (e) => saveCart(e) }
        >
          Adicionar ao carrinho
        </button>
        <form>
          <label htmlFor="email">
            Campo de Email:
            <input
              type="text"
              name="email"
              value={ email }
              placeholder="Insira seu email"
              data-testid="product-detail-email"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          {Array(ratingArrayLength).fill(null).map((_element, i) => {
            const index = i + 1;
            return (
              <label htmlFor="rating" key={ index }>
                <input
                  className="input-star"
                  type="radio"
                  data-testid={ `${index}-rating` }
                  name="rating"
                  value={ index }
                  onClick={ (e) => this.handleChange(e) }
                />
                <FaStar
                  className="star"
                  size="30"
                  color={ rating >= index
                    ? '#fdee00'
                    : '#1B1212' }
                />
              </label>);
          })}
          <label htmlFor="description">
            <textarea
              name="description"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
              data-testid="product-detail-evaluation"
              // id="text-area"
            />
          </label>
          <button
            type="submit"
            onClick={ (e) => this.handleButton(e) }
            data-testid="submit-review-btn"
          >
            Enviar
          </button>
        </form>
        <div>
          {(avaliacoes && avaliacoes.length > 0) && (
            avaliacoes.map((element, index) => (
              <div key={ index }>
                <span>{element.email}</span>
                <span>{element.rating}</span>
                <span>{element.description}</span>
              </div>
            ))
          )}
        </div>
      </>
    );
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  saveCart: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
};

// Products.defaultProps = {
//   description: 'description',
// };

export default Products;
