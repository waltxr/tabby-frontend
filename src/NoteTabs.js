import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes } from './actions'


class NoteTabs extends Component {

  componentDidMount() {
    this.props.fetchNotes(this.props.currentUser)
  }

  render() {
    return(
      <div>
        in note tabs
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { fetchNotes })(NoteTabs)
