import React, { Component } from 'react';
import logo from '../img/19².png';

export default class Header extends Component {
  render() {
    return (
      <div>
        <img
          src={ logo }
          size="100"
          height="100"
          alt="logo-img"
          style={ { borderRadius: '5rem' } }
        />
      </div>
    );
  }
}
