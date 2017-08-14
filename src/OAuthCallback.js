import React, {Component} from 'react'
import {oauthCallback} from './lib/auth'

export default class OAuthCallback extends Component {
  componentDidMount() {
    const {match} = this.props
    oauthCallback(match.params.code)
  }
  render() {
    return <div>Signing in...</div>
  }
}
