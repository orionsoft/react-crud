import React from 'react'
import {Form} from 'simple-react-form'

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import * as Colors from 'material-ui/styles/colors'

const contextTypes = {
  displayMessage: React.PropTypes.func,
  setDialog: React.PropTypes.func
}

const propTypes = {
  collection: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  capitalName: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  publication: React.PropTypes.string.isRequired,
  selectItem: React.PropTypes.func.isRequired,
  selectedItemId: React.PropTypes.string.isRequired,
  item: React.PropTypes.object,
  isLoading: React.PropTypes.bool.isRequired,
  cancel: React.PropTypes.func.isRequired
}

const defaultProps = {
}

export default class Update extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  onSuccess () {
    this.context.displayMessage(`${this.props.capitalName} saved`)
  }

  delete () {
    this.context.setDialog({
      title: `Delete ${this.props.name}`,
      message: `Are you sure you want to delete this ${this.props.name}?`,
      submit: () => {
        this.props.collection.remove(this.props.selectedItemId, error => {
          if (error) {
            console.log(error)
            alert(error.reason)
          } else {
            this.props.cancel()
          }
        })
      }
    })
  }

  renderLoading () {
    return (
      <div>
        loading
      </div>
    )
  }

  renderNotFound () {
    return (
      <div style={{ paddingTop: 20, textAlign: 'center' }}>
        <FontIcon className='material-icons' style={styles.icon}>error_outline</FontIcon>
        <div style={styles.text}>
          {this.props.capitalName} not found
        </div>
      </div>
    )
  }

  renderForm () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Form
        collection={this.props.collection}
        type='update'
        ref='form'
        doc={this.props.item}
        onSuccess={this.onSuccess.bind(this)}/>
        <div style={{marginTop: 20}}>
          <RaisedButton style={{marginRight: 10}} label='Cancel' onTouchTap={() => this.props.cancel()}/>
          <RaisedButton style={{marginRight: 10}} label='Delete' secondary onTouchTap={this.delete.bind(this)}/>
          <RaisedButton label='Save' primary onTouchTap={() => this.refs.form.submit()}/>
        </div>
      </div>
    )
  }

  render () {
    if (this.props.isLoading) return this.renderLoading()
    if (!this.props.item) return this.renderNotFound()
    return this.renderForm()
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

Update.propTypes = propTypes
Update.defaultProps = defaultProps
Update.contextTypes = contextTypes
