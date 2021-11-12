import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </nav>
    );
  }
}
