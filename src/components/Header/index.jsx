import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../../pages/Loading';
import Logo from '../images/logo.svg';
import Navigation from '../Navigation';
import ProfileImag from '../images/profile.svg';

import './Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      image: '',
    };
  }

  componentDidMount = () => {
    this.getUserSave();
  }

  getUserSave = async () => {
    this.setState({ loading: true });
    const { name, image } = await getUser();

    this.setState({ user: name, loading: false, image });
  }

  validateImage = () => {
    const { image } = this.state;
    console.log(image);
    const VA = image === '' ? ProfileImag : image;
    return VA;
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <div className="logo-and-user-name">
          <img src={ Logo } alt="Logo Trybe Tunes" />
          {loading ? <Loading />
            : (
              <div className="user">
                <img src={ this.validateImage() } alt="profile img" />
                <span data-testid="header-user-name">{ user }</span>
              </div>
            )}
        </div>
        <Navigation />
      </header>
    );
  }
}
