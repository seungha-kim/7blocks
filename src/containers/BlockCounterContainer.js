import React from 'react'
import PropTypes from 'prop-types'
import formatDuration from '../format-duration'
import log from 'loglevel'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow'
import StopIcon from 'material-ui/svg-icons/av/stop'
import PauseIcon from 'material-ui/svg-icons/av/pause'

export default class BlockCounterContainer extends React.Component {
  static propTypes = {
    blockLength: PropTypes.number.isRequired, // ms
    onComplete: PropTypes.func.isRequired
  }

  state = {
    active: false,
    remaning: null, // Date
    lastDate: null // Date
  }

  reset = () => {
    this.setState({
      active: false,
      remaning: null,
      lastDate: null
    })
  }

  start = () => {
    this.setState((state, props) => {
      const currentDate = new Date()
      return {
        active: true,
        remaning: this.state.remaning || props.blockLength, // resume
        lastDate: currentDate
      }
    })
    this.intervalID = setInterval(() => {
      const currentDate = new Date()
      const remaning = this.state.remaning - (currentDate - this.state.lastDate)
      log.debug(remaning)
      if (remaning < 0) {
        this.complete()
      } else {
        this.setState((state) => {
          return {
            remaning,
            lastDate: currentDate
          }
        })
      }
    }, 200)
  }

  pause = () => {
    clearInterval(this.intervalID)
    this.setState(state => ({
      active: false
    }))
  }

  get started() {
    return this.state.remaning != null
  }

  complete = () => {
    clearInterval(this.intervalID)
    this.reset()
    const {onComplete, blockLength} = this.props
    onComplete(blockLength) // FIXME: 중간에 prop이 변경될 수 있음. 초기 length로 호출해야 함
  }

  cancel = () => {
    clearInterval(this.intervalID)
    this.reset()
  }

  render() {
    const {remaning, active} = this.state
    const {blockLength} = this.props
    return (
      <div className="flex-grow flex-vertical">
        <div className="flex-grow flex-vertical flex-center">
          <div className="clock-font">
            { this.started
              ? formatDuration(remaning)
              : formatDuration(blockLength)
            }
          </div>

        </div>
        <div className="action-buttons-wrap">
          { active
            ? (
              <FloatingActionButton onClick={this.pause}>
                <PauseIcon />
              </FloatingActionButton>
            )
            : (
              <FloatingActionButton onClick={this.start}>
                <PlayArrowIcon />
              </FloatingActionButton>
            )
          }
          { this.started
            ? (
              <FloatingActionButton onClick={this.cancel} secondary>
                <StopIcon />
              </FloatingActionButton>
            )
            : null
          }
        </div>
      </div>
    )
  }
}
