import React, { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumList from '../components/AlbumList';
import '../styles/Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disabled: true,
      loading: false,
      albumList: [],
      notFound: false,
      titleArtist: '',
    };
  }

  handleChangeInput = ({ target: { value } }) => {
    const MIN_CHARACTERS = 2;
    this.setState({
      artist: value,
      disabled: value.length < MIN_CHARACTERS,
    });
  }

  handleChangeButton = async () => {
    const { artist } = this.state;
    this.setState({ titleArtist: artist, artist: '', disabled: true, loading: true });
    const albums = await searchAlbumsAPI(artist);
    this.setState({
      albumList: albums.filter((album) => album.artistName),
      loading: false,
      notFound: true,
    });
  }

  render() {
    const {
      handleChangeInput,
      handleChangeButton,
      state: { artist, disabled, loading, albumList, notFound, titleArtist },
    } = this;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-input">
          <div className="input-and-icon">
            <input
              type="text"
              name="artist"
              className="search-artist-input"
              value={ artist }
              onChange={ handleChangeInput }
              placeholder="Nome do Artista ou Banda"
              data-testid="search-artist-input"
            />
            <GoSearch />

          </div>
          <button
            type="submit"
            className="search-artist-button"
            disabled={ disabled }
            onClick={ handleChangeButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>

        { loading && <Loading /> }

        { notFound && <AlbumList
          albumList={ albumList }
          titleArtist={ titleArtist }
        /> }
      </div>
    );
  }
}
