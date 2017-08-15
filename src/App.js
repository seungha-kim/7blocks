import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { newAuth, deleteAuth } from './auth'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'

import UserMessageContainer from './containers/UserMessageContainer'
import OnlyAuthenticatedContainer from './containers/OnlyAuthenticatedContainer'
import LoginScreenContainer from './containers/LoginScreenContainer'
import LogoutButtonContainer from './containers/LogoutButtonContainer'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001/graphql',
    opts: {
      credentials: 'include',
    }
  })
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route path='/login' component={LoginScreenContainer} />
            <Route path='/' render={() => (
              <OnlyAuthenticatedContainer>
                <UserMessageContainer />
                <LogoutButtonContainer />
              </OnlyAuthenticatedContainer>
            )} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }

}

export default App;
