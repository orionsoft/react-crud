import React from 'react'
import {Form} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'

const contextTypes = {
  displayMessage: React.PropTypes.func
}

const propTypes = {
  collection: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  capitalName: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  cancel: React.PropTypes.func.isRequired,
  selectItem: React.PropTypes.func.isRequired,
  showCancelButton: React.PropTypes.bool
}

const defaultProps = {
  showCancelButton: true
}

export default class Create extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  onSuccess (itemId) {
    this.context.displayMessage(`${this.props.capitalName} created`)
    this.props.selectItem(itemId)
  }

  renderCancelButton () {
    if (!this.props.showCancelButton) return
    return <RaisedButton style={{marginRight: 10}} label='Cancel' onTouchTap={() => this.props.cancel()}/>
  }

  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Form
        collection={this.props.collection}
        type='insert'
        ref='form'
        onSuccess={this.onSuccess.bind(this)}/>
        <div style={{marginTop: 20}}>
          {this.renderCancelButton()}
          <RaisedButton label='Create' primary onTouchTap={() => this.refs.form.submit()}/>
        </div>
      </div>
    )
  }

}

Create.propTypes = propTypes
Create.defaultProps = defaultProps
Create.contextTypes = contextTypes
