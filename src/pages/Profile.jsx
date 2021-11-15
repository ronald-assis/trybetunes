import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import ProfileImag from '../components/images/profile.svg';
import Loading from './Loading';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getValueUser();
  }

  getValueUser = async () => {
    this.setState({ loading: true });
    const valueUser = await getUser();
    this.setState({
      user: valueUser.name,
      email: valueUser.email,
      image: valueUser.image,
      description: valueUser.description,
      loading: false,
    });
  }

  validateImage = () => {
    const { image } = this.state;
    const VA = image === '' ? ProfileImag : image;
    return VA;
  }

  render() {
    const {
      validateImage,
      state: { user, email, description, loading },
    } = this;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : (
            <div className="content-profile">
              <div className="image-and-link-edit-profile">
                <img
                  src={ validateImage() }
                  alt="Imagem do perfil"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </div>

              <div className="name-user">
                <h3>Nome</h3>
                <p>{ user }</p>
              </div>

              <div className="email-user">
                <h3>E-mail</h3>
                <p>{ email }</p>
              </div>

              <div className="description-user">
                <h3>Descrição</h3>
                <p>{ description }</p>
              </div>

            </div>
          )}

      </div>

    );
  }
}
