import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes, batchUpdateNotes } from './actions'
import { Tab } from 'semantic-ui-react'
import NoteTab from './NoteTab'


class NoteTabs extends Component {

  runBatchUpdates = () => {
    if (this.props.updatedNotes.length > 0) {
      let notesToUpdate = this.props.notes.filter(note => this.props.updatedNotes.includes(note.id))
      this.props.batchUpdateNotes(notesToUpdate, this.props.token)
    }
  }

  componentDidMount() {
    const { token, fetchNotes } = this.props
    fetchNotes(token);
    setInterval(() => {
      this.runBatchUpdates()
    }, 5000)
  }

  render() {

    const panes = this.props.notes.map((note) => {
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
    token: state.auth.token,
    updatedNotes: state.notes.updatedNotes
  }
}

export default connect(mapStateToProps, { fetchNotes, batchUpdateNotes })(NoteTabs)
