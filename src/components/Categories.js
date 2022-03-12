import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categoriesName, categoriesResults, categoriesId } = this.props;
    return (
      <nav>
        <label htmlFor={ categoriesId } data-testid="category">
          { categoriesName }
          <input
            type="radio"
            id={ categoriesId }
            value={ categoriesId }
            name="categories"
            onClick={ categoriesResults }
          />
        </label>
      </nav>
    );
  }
}

Categories.propTypes = {
  categoriesName: PropTypes.string.isRequired,
  categoriesResults: PropTypes.func.isRequired,
  categoriesId: PropTypes.string.isRequired,
};

export default Categories;
