import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteMusics: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getFavoriteMusics();
  }

  getFavoriteMusics = async () => {
    this.setState({ loading: true });
    const musics = await getFavoriteSongs();
    this.setState({ favoriteMusics: musics, loading: false });
  }

  refreshFavoriteMusic = () => {
    this.setState({ loading: true });
    this.getFavoriteMusics();
  }

  render() {
    const {
      refreshFavoriteMusic,
      state: { loading, favoriteMusics },
    } = this;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : (
            <div className="content-favorite-musics">
              <p>Músicas Favoritas:</p>
              <div className="list-favorites-musics">
                <ol>
                  {
                    favoriteMusics.map((music) => (
                      <li key={ music.trackId }>
                        <MusicCard
                          music={ music }
                          refreshFavoriteMusic={ refreshFavoriteMusic }
                        />

                      </li>
                    ))
                  }

                </ol>
              </div>
            </div>
          ) }
      </div>
    );
  }
}
