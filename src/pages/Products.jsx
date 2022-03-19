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
      <div className="conteinerProduct">
        <ButtonCart cartQuantity={ cartQuantity } />
        <div className="productCard">
          <div className="product" data-testid="product-detail-name">
            <h1 className="productTitle">{ infoDetails.title }</h1>
            <img
              className="productImage"
              src={ infoDetails.thumbnail }
              alt={ infoDetails.title }
            />
            {shipping.free_shipping
          && (
            <span className="productFree">
              Frete Grátis
              <FaTruck
                color="#000000"
              />
            </span>
          )}
            <h3 className="productPrice">
              {`R$ ${infoDetails.price ? infoDetails.price : ''}`}
            </h3>
            <button
              className="buttonAddCart"
              type="button"
              name={ id }
              data-testid="product-detail-add-to-cart"
              onClick={ (e) => saveCart(e) }
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="especific">
            <h2 className="especificTitle">Especificações Técnicas</h2>
            {productSpecs.length > 0 && productSpecs.map((element) => (
              <li key={ element.name }>
                {(element.name)}
                :
                {(element.value_name)}
              </li>
            ))}
          </div>
        </div>
        <h1 className="formTitle">Avaliações</h1>
        <div className="formAvailable">
          <form>
            <label htmlFor="email">
              <input
                className="formEmail"
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
                    size="25"
                    color={ rating >= index
                      ? '#fdee00'
                      : '#1B1212' }
                  />
                </label>);
            })}
            <label htmlFor="description">
              <textarea
                className="formDescription"
                name="description"
                value={ description }
                onChange={ (e) => this.handleChange(e) }
                data-testid="product-detail-evaluation"
                placeholder="Mensagem(opcional)"
              />
            </label>
            <button
              className="formButton"
              type="submit"
              onClick={ (e) => this.handleButton(e) }
              data-testid="submit-review-btn"
            >
              Enviar
            </button>
          </form>
        </div>
        <div>
          {(avaliacoes && avaliacoes.length > 0) && (
            avaliacoes.map((element, index) => (
              <div className="available" key={ index }>
                <span>{element.email}</span>
                <span>{element.rating}</span>
                <span>{element.description}</span>
              </div>
            ))
          )}
        </div>
      </div>
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
