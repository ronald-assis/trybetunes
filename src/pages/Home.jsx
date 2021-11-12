import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="serch" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
        </Switch>
      </div>
    );
  }
}
