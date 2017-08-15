import React from 'react'
import {compose} from 'react-apollo'

import withLogin from '../hocs/withLogin'

const SimpleParent = props => (
  <div>{props.children}</div>
)

export default compose(
  withLogin
)(SimpleParent)
