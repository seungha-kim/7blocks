import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import OnlyAuthenticatedContainer from './containers/OnlyAuthenticatedContainer'
import LoginScreenContainer from './containers/LoginScreenContainer'
import MainContainer from './containers/MainContainer'

injectTapEventPlugin();

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    opts: {
      credentials: 'include',
    }
  })
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Switch>
              <Route path='/login' component={LoginScreenContainer} />
              <Route path='/' render={() => (
                <OnlyAuthenticatedContainer>
                  <MainContainer />
                </OnlyAuthenticatedContainer>
              )} />
            </Switch>
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }

}

export default App;
