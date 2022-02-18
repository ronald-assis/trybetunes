import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

export default class AlbumCard extends Component {
  render() {
    const { album: {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } } = this.props;

    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt={ `Capa do álbum ${collectionName} de ${artistName}` }
          />
          <div className="album-info">
            <h4>{ collectionName }</h4>
            <p>{ artistName }</p>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
