import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/19².png';

const HeaderStyled = styled.div`
  background-color: RGB(90, 111, 128);
  display: flex;
  justify-content: center;
`;

export default class Header extends Component {
  render() {
    return (
      <Link to="/">
        <HeaderStyled>
          <img
            src={ logo }
            size="100"
            height="100"
            alt="logo-img"
            style={ { borderRadius: '5rem' } }
          />
        </HeaderStyled>
      </Link>
    );
  }
}
