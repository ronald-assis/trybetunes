import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
        { loading ? <Loading /> : <span data-testid="header-user-name">{ user }</span> }
      </header>
    );
  }
}
