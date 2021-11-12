import React, { Component } from 'react';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <ProfileEdit />
      </div>
    );
  }
}
