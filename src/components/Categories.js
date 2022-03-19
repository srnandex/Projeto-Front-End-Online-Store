import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNames = styled.label`
  color: red;
  display: block;
  height: 35px;
`;

class Categories extends React.Component {
  render() {
    const { categoriesName, categoriesResults, categoriesId } = this.props;
    return (
      <nav>
        <StyledNames>
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
        </StyledNames>
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
