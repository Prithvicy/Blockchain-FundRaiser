import React, { Component } from 'react'
import Header from './components/helper/Header'
import { Switch, Route } from 'react-router-dom'
import requireAuthentication from './utils/requireAuth'
import Feed from './components/Feed'
import Editor from './components/Editor'
import Profile from './components/Profile'
import ArticleView from './components/ArticleView'
import SignInWith from './components/SignInWith'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import * as actType from './redux/actions/ActionTypes'
import cauhinhStore, { history } from './redux/store'
import './assets/medium.css'

const store = cauhinhStore()
if (localStorage.Auth) {
  store.dispatch({
    type: actType.SET_USER, user: JSON.parse(localStorage.Auth)
  })
}

class App extends Component {
  render() {
    const { pathname } = window.location
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {!pathname.includes('editor') ? <Header /> : ''}
          <SignInWith />
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/articleview/:id" component={ArticleView} />
            <Route path="/editor" component={requireAuthentication(Editor)} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="**" component={Feed} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App