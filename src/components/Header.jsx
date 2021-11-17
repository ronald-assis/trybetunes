import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Logo from './images/logo.svg';
import Navigation from './Navigation';
import '../styles/Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getUserSave();
  }

  getUserSave = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ user: name, loading: false });
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
                <span data-testid="header-user-name">{ user }</span>
              </div>
            )}
        </div>
        <Navigation />
      </header>
    );
  }
}
