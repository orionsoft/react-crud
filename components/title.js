import React from 'react'

const propTypes = {
  label: React.PropTypes.any
}

const defaultProps = {

}

export default class Title extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <span style={styles.title}>
        {this.props.label}
      </span>
    )
  }

}

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 500
  }
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps
