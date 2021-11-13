import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCArd';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      albumName: '',
      artist: '',
      loading: false,
      musics: [],
    };
  }

  componentDidMount = () => {
    this.renderGetMusic();
  }

  renderGetMusic = async () => {
    const { match: { params } } = this.props;
    this.setState({ loading: true });
    const data = await getMusics(params.id);
    this.setState({
      url: data[0].artworkUrl100,
      albumName: data[0].collectionName,
      artist: data[0].artistName,
      musics: data.filter((music, index) => index !== 0 && music),
      loading: false,
    });
  }

  render() {
    const {
      state: { url, albumName, artist, loading, musics },
    } = this;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        <div className="content-album">
          <div className="info-album">
            <img
              src={ url }
              alt={ `Capa do álbum ${albumName} de ${artist}` }
            />
            <div className="album-artist-name">
              <h4 data-testid="album-name">{ albumName }</h4>
              <p data-testid="artist-name">{ artist }</p>
            </div>
          </div>
          <div className="list-music-album">
            <ol>
              { musics.map((music) => (
                <li key={ music.trackId }>
                  <MusicCard music={ music } />
                </li>
              )) }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
