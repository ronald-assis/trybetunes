import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../AlbumCard';
import './AlbumList.css';

export default class AlbumList extends Component {
  render() {
    const { albumList, titleArtist } = this.props;
    const MIN = 0;
    const renderAlbumList = albumList.length > MIN;

    return (
      renderAlbumList
        ? (
          <div className="album-List">
            <span className="title-artist">
              {`Resultado de álbuns de ${titleArtist}:`}
            </span>
            <ol>
              { albumList.map((album) => (
                <li key={ album.collectionId }>
                  <AlbumCard album={ album } />
                </li>
              )) }
            </ol>
          </div>

        ) : <span>Nenhum álbum foi encontrado</span>
    );
  }
}

AlbumList.propTypes = {
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleArtist: PropTypes.string.isRequired,
};
