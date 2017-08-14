import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { newAuth, syncAuth, deleteAuth } from './auth'

import logo from './logo.svg'

const NO_USER_MESSAGE = 'no user'

const Intro = props => (
  <div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
)

const HelloWorld = props => (
  <div>
    Hello world!
  </div>
)


class App extends Component {
  state = {
    message: NO_USER_MESSAGE
  }

  componentDidMount() {
    syncAuth().then(this.afterAuth)
  }

  afterAuth = user => {
    this.setState({
      message: user.email
    })
  }

  login = () => {
    newAuth().then(() => {
      syncAuth().then(this.afterAuth)
    })
  }

  logout = () => {
    deleteAuth().then(() => {
      this.setState({
        message: NO_USER_MESSAGE
      })
    })
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            {this.state.message}
            <button onClick={this.login}>login</button>
            <button onClick={this.logout}>logout</button>
            <Route exact path="/" component={Intro} />
            <Route path="/hello" component={HelloWorld} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
