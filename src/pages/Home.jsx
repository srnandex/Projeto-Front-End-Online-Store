import React from 'react';
import ButtonCart from '../components/ButtonCart';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <input type="text" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <ButtonCart />
      </div>
    );
  }
}

export default Home;
