import React from 'react';
import PropTypes from 'prop-types';
import ButtonCart from '../components/ButtonCart';
import { getProducts } from '../services/api';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      productSpecs: [],
      infoDetails: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { attributes } = await getProducts(id);
    const productDetails = await getProducts(id);
    this.setState({ productSpecs: attributes, infoDetails: productDetails });
  }

  render() {
    const { productSpecs, infoDetails } = this.state;
    return (
      <div data-testid="product-detail-name">
        <ButtonCart />
        <h1>{ infoDetails.title }</h1>
        <img src={ infoDetails.thumbnail } alt={ infoDetails.title } />
        <h3>{infoDetails.price}</h3>
        {productSpecs.length > 0 && productSpecs.map((element) => (
          <h1 key={ element.name }>
            {(element.name)}
            :
            {(element.value_name)}
          </h1>
        ))}
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
};
export default Products;
