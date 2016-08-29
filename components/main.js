import React from 'react'
import {createContainer} from 'meteor/react-meteor-data'

import MastDetailLayout from './layouts/mastdetail'
import SimpleLayout from './layouts/simple'
import SmallListLayout from './layouts/small-list'

import Index from './index'
import Update from './update'
import Create from './create'

const propTypes = {
  /**
   * The layout, can be mastdetail, simple, small-list or a custom component
   */
  layout: React.PropTypes.any,

  /**
   * Collection
   */
  collection: React.PropTypes.object.isRequired,

  /**
   * Name of one item of the collection (just for texts)
   */
  name: React.PropTypes.string,

  /**
   * The title of the index
   */
  indexTitle: React.PropTypes.string,

  /**
   * The name of the publication (collection-list)
   */
  indexName: React.PropTypes.string.isRequired,

  /**
   * List of fields that will be rendered
   */
  indexFields: React.PropTypes.arrayOf(React.PropTypes.shape({
    /**
     * The title which will be shown at the header of the table
     */
    title: React.PropTypes.string.isRequired,

    /**
     * A function that renders the row/column
     */
    render: React.PropTypes.func.isRequired
  })),

  /**
   * A function that must set the state of the selected item. Here you should
   * change the route or set the itemId in the react state.
   */
  selectItem: React.PropTypes.func,

  /**
   * The id of the selected item. Se same that you saved with selectItem
   */
  selectedItemId: React.PropTypes.string,

  /**
   * Title of the update page
   * @type {[type]}
   */
  updateTitle: React.PropTypes.string,

  /**
   * The name of the publication that publish the docuement and recieves the docId
   */
  updatePublication: React.PropTypes.string,

  /**
   * Show the create button
   */
  showCreate: React.PropTypes.bool,

  /**
   * Title of the create page
   */
  createTitle: React.PropTypes.string,

  /**
   * Passes this params to the publication
   */
  passParams: React.PropTypes.object,

  /**
   * The index component
   */
  indexComponent: React.PropTypes.any,

  /**
   * OThe update component
   */
  updateComponent: React.PropTypes.any,

  /**
   * The create component
   * @type {[type]}
   */
  createComponent: React.PropTypes.any
}

const defaultProps = {
  layout: 'simple',
  name: 'item',
  indexTitle: 'Index',
  indexFields: [{ title: 'ID', render: item => item._id }],
  updateTitle: 'Update',
  createTitle: 'Create',
  showCreate: true,
  passParams: {},
  indexComponent: Index,
  updateComponent: Update,
  createComponent: Create,
  selectItem: () => {}
}

const isClass = function (comp) {
  return comp.prototype && comp.prototype.isReactComponent
}

export default class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.state.isUpdateItemLoading = false

    this.updateContainer = createContainer(({selectedItemId, publication, collection, passParams}) => {
      const handler = this.getConnection().subscribe(publication, selectedItemId, passParams)
      const isLoading = !handler.ready()
      const item = collection.findOne(selectedItemId)
      this.setUpdateItemLoading(isLoading)
      return {isLoading, item}
    }, props.updateComponent)
  }

  getConnection () {
    return this.props.collection._connection
  }

  setUpdateItemLoading (isUpdateItemLoading) {
    if (this.state.isUpdateItemLoading === isUpdateItemLoading) return
    this.setState({isUpdateItemLoading})
  }

  getCapitalName () {
    const firstLetter = this.props.name.slice(0, 1)
    return firstLetter.toUpperCase() + this.props.name.substring(1)
  }

  getCreateProps (passProps) {
    return {
      collection: this.props.collection,
      name: this.props.name,
      capitalName: this.getCapitalName(),
      title: this.props.createTitle,
      selectItem: this.props.selectItem,
      cancel: () => this.props.selectItem(''),
      ...passProps
    }
  }

  renderCreate (passProps) {
    const props = this.getCreateProps(passProps)
    if (isClass(this.props.createComponent)) {
      return <this.props.createComponent {...props}/>
    } else {
      return this.props.createComponent(props)
    }
  }

  getUpdateProps (passProps) {
    return {
      collection: this.props.collection,
      name: this.props.name,
      capitalName: this.getCapitalName(),
      title: this.props.updateTitle,
      publication: this.props.updatePublication,
      selectItem: this.props.selectItem,
      selectedItemId: this.props.selectedItemId,
      cancel: () => this.props.selectItem(''),
      passParams: this.props.passParams,
      ...passProps
    }
  }

  renderUpdate (passProps) {
    const props = this.getUpdateProps(passProps)
    return <this.updateContainer {...props}/>
  }

  getIndexProps (passProps) {
    return {
      collection: this.props.collection,
      capitalName: this.getCapitalName(),
      title: this.props.indexTitle,
      name: this.props.indexName,
      fields: this.props.indexFields,
      selectItem: this.props.selectItem,
      selectedItemId: this.props.selectedItemId,
      create: () => this.props.selectItem('create'),
      passParams: this.props.passParams,
      showCreateButton: this.props.showCreate,
      ...passProps
    }
  }

  renderIndex (passProps) {
    const props = this.getIndexProps(passProps)
    if (isClass(this.props.indexComponent)) {
      return <this.props.indexComponent {...props}/>
    } else {
      return this.props.indexComponent(props)
    }
  }

  render () {
    const props = {
      renderIndex: this.renderIndex.bind(this),
      renderCreate: this.renderCreate.bind(this),
      renderUpdate: this.renderUpdate.bind(this),
      selectedItemId: this.props.selectedItemId,
      selectItem: this.props.selectItem,
      isUpdateItemLoading: this.state.isUpdateItemLoading,
      name: this.props.name
    }
    if (this.props.layout === 'mastdetail') {
      return <MastDetailLayout {...props}/>
    } else if (this.props.layout === 'simple') {
      return <SimpleLayout {...props}/>
    } else if (this.props.layout === 'small-list') {
      return <SmallListLayout {...props}/>
    } else {
      return <this.props.layout {...props}/>
    }
  }

}

Main.propTypes = propTypes
Main.defaultProps = defaultProps
