import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import * as Colors from 'material-ui/styles/colors'

const propTypes = {
  renderIndex: React.PropTypes.func.isRequired,
  renderCreate: React.PropTypes.func.isRequired,
  renderUpdate: React.PropTypes.func.isRequired,
  selectedItemId: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
}

const defaultProps = {
}

export default class SmallListLayout extends React.Component {

  renderNoItem () {
    return (
      <div style={{ paddingTop: 20, textAlign: 'center' }}>
        <FontIcon className='material-icons' style={styles.icon}>touch_app</FontIcon>
        <div style={styles.text}>
          Select a {this.props.name}
        </div>
      </div>
    )
  }

  renderForm () {
    if (this.props.selectedItemId === 'create') {
      return this.props.renderCreate({ showCancelButton: true })
    } else if (this.props.selectedItemId) {
      return this.props.renderUpdate()
    } else {
      return this.renderNoItem()
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-4'>
          {this.props.renderIndex({ showCreateButton: true })}
        </div>
        <div className='col-xs-12 col-sm-8'>
          {this.renderForm()}
        </div>
      </div>
    )
  }

}

const styles = {
  icon: {
    color: Colors.grey500
  },
  text: {
    fontSize: 22,
    color: Colors.grey500,
    paddingTop: 10,
    paddingBottom: 20
  }
}

SmallListLayout.propTypes = propTypes
SmallListLayout.defaultProps = defaultProps
