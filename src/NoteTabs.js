import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes, batchUpdateNotes, logOut } from './actions'
import { Tab } from 'semantic-ui-react'
import NoteTab from './NoteTab'


class NoteTabs extends Component {

  runBatchUpdates = () => {
    const { tokenExpiresAt, logOut } = this.props
    if (Date.parse(tokenExpiresAt) < Date.now()) {
      logOut()
      clearInterval(this.interval)
    } else {
      if (this.props.updatedNotes.length > 0) {
        let notesToUpdate = this.props.notes.filter(note => this.props.updatedNotes.includes(note.id))
        this.props.batchUpdateNotes(notesToUpdate, this.props.token, this.props.tokenExpiresAt)
      }
    }
  }

  componentDidMount() {
    const { token, fetchNotes } = this.props
    fetchNotes(token)
    this.interval = setInterval(() => {
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
    notes: state.notes.list.filter(note => note.active === true),
    token: state.auth.token,
    tokenExpiresAt: state.auth.tokenExpiresAt,
    updatedNotes: state.notes.updatedNotes
  }
}

export default connect(mapStateToProps, { fetchNotes, batchUpdateNotes, logOut })(NoteTabs)
