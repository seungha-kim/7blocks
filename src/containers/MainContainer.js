import React from 'react'
import Drawer from 'material-ui/Drawer'
import {graphql} from 'react-apollo'

import CardListContainer from './CardListContainer'
import LogoutButtonContainer from './LogoutButtonContainer'
import BlockCounterContainer from './BlockCounterContainer'
import newBlock from '../queries/newBlock'

import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

import log from 'loglevel'

class MainContainer extends React.Component {
  state = {
    selectedCardID: null,
    drawerOpen: true
  }

  onSelect = id => {
    log.info(`selected card id: ${id}`)
    this.setState({
      selectedCardID: id,
      drawerOpen: false
    })
  }

  onComplete = blockLength => {
    log.info(`complete: ${this.state.selectedCardID} during ${blockLength}`)
    this.props.newBlock({
      variables: {
        cardId: this.state.selectedCardID,
        length: blockLength
      }
    }).then(() => {
      this.setState({
        selectedCardID: null,
        drawerOpen: true
      })
    })
  }

  get noCardSelected() {
    return this.state.selectedCardID == null
  }

  onRequestChange = (open, reason) => {
    if (!this.noCardSelected) {
      this.setState({
        drawerOpen: open
      })
    }
  }

  render() {
    return (
      <div className="main-wrap">
        <Drawer onRequestChange={this.onRequestChange} docked={false} width={300} open={this.state.drawerOpen}>
          <CardListContainer onSelect={this.onSelect} />
          <LogoutButtonContainer />
        </Drawer>
        <div>
          <IconButton onClick={() => {this.onRequestChange(true, 'button')}}>
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex-grow flex-vertical">
          <BlockCounterContainer blockLength={3000000} onComplete={this.onComplete} />
        </div>
      </div>
    )
  }
}

export default graphql(newBlock, {
  name: 'newBlock'
})(MainContainer)
