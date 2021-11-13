import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checkFavorite: false,
      loading: false,
    };
  }

  componentDidMount = async () => {
    const getFavorite = await getFavoriteSongs();
    this.favoriteSongs(getFavorite);
  }

  handleChangeChecked = async ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
    const { music } = this.props;
    const { checkFavorite } = this.state;

    if (!checkFavorite) {
      this.setState({ loading: true });
      await addSong(music);
      this.setState({ loading: false, checkFavorite: true });
    }
  }

  favoriteSongs = (songs) => {
    const { music: { trackId } } = this.props;
    if (songs.some((song) => song.trackId === trackId)) {
      this.setState({ checkFavorite: true });
    }
  }

  render() {
    const {
      handleChangeChecked,
      props: {
        music: { previewUrl, trackName, trackId },
      },
      state: {
        checkFavorite, loading },
    } = this;
    return (
      loading ? <Loading />
        : (
          <div className="music">
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="checkFavorite">
              <input
                type="checkbox"
                name="checkFavorite"
                id="checkFavorite"
                checked={ checkFavorite }
                onChange={ handleChangeChecked }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
