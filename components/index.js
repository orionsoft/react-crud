import React from 'react'
import {Form, Field} from 'simple-react-form'
import IconButton from 'material-ui/IconButton'
import {List} from 'meteor/orionsoft:collection-list'
import SaveStateComponent from './save-state'
import Title from './title'

import {Table,
TableHeader,
TableHeaderColumn,
TableBody,
TableRow,
TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper'

const propTypes = {
  create: React.PropTypes.func.isRequired,
  collection: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  fields: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    render: React.PropTypes.func.isRequired
  })),
  selectItem: React.PropTypes.func.isRequired,
  selectedItemId: React.PropTypes.string,
  showCreateButton: React.PropTypes.bool,
  passParams: React.PropTypes.object.isRequired,
  past: React.PropTypes.array
}

const defaultProps = {
  showCreateButton: true
}

export default class Index extends SaveStateComponent {

  constructor (props) {
    super(props)
    this.state = {filter: ''}
    this.savingKey = props.publication + 'container'
  }

  getParams () {
    return {filter: this.state.filter, ...this.props.passParams}
  }

  collectionPubPassProps () {
    return {}
  }

  onClick (item) {
    const isSelected = this.props.selectedItemId === item._id
    if (isSelected) {
      this.props.selectItem('')
    } else {
      this.props.selectItem(item._id)
    }
  }

  renderParent ({children}) {
    const columns = this.props.fields.map(field => (
      <TableHeaderColumn key={field.title}>{field.title}</TableHeaderColumn>
    ))
    return (
      <Table selectable fixedHeader
      multiSelectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {columns}
          </TableRow>
        </TableHeader>
        <TableBody showRowHover displayRowCheckbox={false}>
          {children}
        </TableBody>
      </Table>
    )
  }

  renderItem ({item}) {
    const isSelected = this.props.selectedItemId === item._id
    const columns = this.props.fields.map(field => (
      <TableRowColumn key={field.title}>{field.render(item)}</TableRowColumn>
    ))
    return (
      <TableRow
      selected={isSelected}
      onClick={this.onClick.bind(this, item)}
      hoverable
      style={{ cursor: 'pointer' }}>
        {columns}
      </TableRow>
    )
  }

  renderItems () {
    return (
      <Paper>
        <List
        collection={this.props.collection}
        name={this.props.name}
        itemComponent={this.renderItem.bind(this)}
        parentComponent={this.renderParent.bind(this)}
        params={this.getParams()}
        saveState={this.props.publication}
        {...this.collectionPubPassProps()}
        />
      </Paper>
    )
  }

  renderCreateButton () {
    if (!this.props.showCreateButton) return
    return (
      <IconButton
      onTouchTap={this.props.create}
      iconClassName='material-icons'
      tooltip='Create'>
        add
      </IconButton>
    )
  }

  renderFilter () {
    return (
      <Form state={this.state} onChange={changes => this.setState(changes)}>
        <Field
        fieldName='filter'
        hintText='Search'
        type='text'/>
      </Form>
    )
  }

  renderTitle () {
    return <Title label={this.props.title}/>
  }

  renderHeader () {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-6'>
          {this.renderTitle()}
        </div>
        <div className='col-xs-12 col-sm-6'>
          <div className='row'>
            <div className='col-xs-12 col-sm-2' style={{textAlign: 'right'}}>
              {this.renderCreateButton()}
            </div>
            <div className='col-xs-12 col-sm-10'>
              {this.renderFilter()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div style={styles.container}>
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    )
  }

}

Index.propTypes = propTypes
Index.defaultProps = defaultProps

const styles = {
  container: {
  },
  title: {
    fontSize: 26,
    marginRight: 20,
    fontWeight: 500,
    position: 'relative',
    top: 4
  }
}
