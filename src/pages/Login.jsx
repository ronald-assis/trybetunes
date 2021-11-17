import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Logo from '../components/images/LOGO_POSITIVA .svg';
import Loading from './Loading';
import '../styles/Login.css';

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

  handleClick = async (event) => {
    event.preventDefault();
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
      <div className="page-login" data-testid="page-login">
        {loading ? <Loading /> : (
          <div className="form-and-image">
            <img src={ Logo } alt="Logo Trybe Tunes" />
            <form>
              <div className="button-input">
                <input
                  type="text"
                  name="user"
                  value={ user }
                  onChange={ handleInput }
                  className="user-name-input"
                  placeholder="Nome do usúario"
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
              </div>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}
