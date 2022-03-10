import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categoriesName } = this.props;
    return (
      <nav>
        <label htmlFor="categories" data-testid="category">
          { categoriesName }
          <input
            type="radio"
            id="categories"
          />
        </label>
      </nav>
    );
  }
}

Categories.propTypes = {
  categoriesName: PropTypes.string.isRequired,
};

export default Categories;
