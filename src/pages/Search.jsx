import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disabled: true,
    };
  }

  handleChangeInput = ({ target: { value } }) => {
    const MIN_CHARACTERS = 2;
    this.setState({
      artist: value,
      disabled: value.length < MIN_CHARACTERS,
    });
  }

  render() {
    const {
      handleChangeInput,
      state: { artist, disabled },
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist"
            className="search-artist-input"
            value={ artist }
            onChange={ handleChangeInput }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            className="search-artist-button"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
