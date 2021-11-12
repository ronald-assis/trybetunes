import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      redirect: false,
      disabled: true,
    };
  }

  handleInput = ({ target: { value } }) => {
    const MIN_LETTERS = 3;
    this.setState({
      user: value,
      disabled: value.length < MIN_LETTERS,
    });
  }

  handleClick = async () => {
    const { user } = this.state;
    this.setState(({ loading: true }));
    await createUser({ name: user });
    this.setState(({ redirect: true, loading: false }));
  }

  render() {
    const {
      handleClick,
      handleInput,
      state: {
        user,
        loading,
        redirect,
        disabled,
      },
    } = this;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="user"
            value={ user }
            onChange={ handleInput }
            className="user-name-input"
            data-testid="login-name-input"
          />
          <button
            type="submit"
            className="button-redirect"
            disabled={ disabled }
            onClick={ handleClick }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}
