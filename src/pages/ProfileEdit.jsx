import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import ProfileImag from '../components/images/profile.svg';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
      buttonSave: false,
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setUser(user);
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.validationInput();
  }

  handlesClickButton = (evt) => {
    evt.preventDefault();
    const { name, email, image, description } = this.state;
    const userObj = { name, email, image, description };
    updateUser(userObj);
    this.setState({ loading: true, buttonSave: true });
  }

  setUser = (user) => {
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
    }, () => {
      this.setState({ loading: false });
    });
  }

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  }

  validationInput = () => {
    const { name, image, email, description } = this.state;
    const validation = (
      !name
      || !this.validateEmail(email)
      || !image
      || !description
    );
    return validation;
  }

  validateImage = () => {
    const { image } = this.state;
    const VA = image === '' || image === undefined ? ProfileImag : image;
    return VA;
  }

  render() {
    const {
      validateImage,
      handleChangeInput,
      handlesClickButton,
      state: { name, image, email, description, loading, buttonSave },
    } = this;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading />
          : (

            <form>
              <div className="new-image-profile">
                <img src={ validateImage() } alt="Nova imagem de perfil" />
                <input
                  type="text"
                  name="image"
                  className="edit-input-image"
                  value={ image }
                  onChange={ handleChangeInput }
                  placeholder="insira um link"
                  data-testid="edit-input-image"
                />
              </div>

              <div className="info-name-user input">
                <h4>Nome</h4>
                <span>Fique á vontade para usar seu nome </span>
                <input
                  type="text"
                  name="name"
                  id="edit-input-name"
                  value={ name }
                  onChange={ handleChangeInput }
                  placeholder="Nome do usúario"
                  data-testid="edit-input-name"
                />
              </div>

              <div className="info-email-user input">
                <h4>E-mail</h4>
                <span>Escolha um email que consulte diariamente</span>
                <input
                  type="email"
                  name="email"
                  id="edit-input-email"
                  value={ email }
                  onChange={ handleChangeInput }
                  placeholder="usuario@usuario.com.br"
                  data-testid="edit-input-email"
                />
              </div>

              <div className="info-description-user input">
                <h4>Descrição</h4>
                <textarea
                  name="description"
                  id="edit-input-description"
                  cols="30"
                  rows="10"
                  value={ description }
                  onChange={ handleChangeInput }
                  placeholder="Sobre mim"
                  data-testid="edit-input-description"
                />

              </div>
              <div>
                <button
                  type="submit"
                  className="button-save"
                  disabled={ this.validationInput() }
                  onClick={ handlesClickButton }
                  data-testid="edit-button-save"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        { buttonSave && <Redirect to="/profile" />}
      </div>
    );
  }
}
