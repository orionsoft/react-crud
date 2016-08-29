import React from 'react'

const propTypes = {
  renderIndex: React.PropTypes.func.isRequired,
  renderCreate: React.PropTypes.func.isRequired,
  renderUpdate: React.PropTypes.func.isRequired,
  selectedItemId: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
}

const defaultProps = {
}

export default class Layout extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.selectedItemId === 'create') {
      return this.props.renderCreate()
    } else if (this.props.selectedItemId) {
      return this.props.renderUpdate()
    } else {
      return this.props.renderIndex()
    }
  }

}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps
