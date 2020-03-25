import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes } from './actions'
import { Tab } from 'semantic-ui-react'
import NoteTab from './NoteTab'


class NoteTabs extends Component {

  componentDidMount() {
    const { token } = this.props
    this.props.fetchNotes(token)
  }

  render() {
    const panes = this.props.notes.map((note, i) => {
      return {
        menuItem: note.title,
        render: () => <NoteTab note={note} />
      }
    })

    return(
      <div>
        <Tab panes={panes} />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    notes: state.notes.list,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { fetchNotes })(NoteTabs)
