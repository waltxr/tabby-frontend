import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes, batchUpdateNotes, logOut } from './actions'
import { Tab } from 'semantic-ui-react'
import NoteTab from './NoteTab'


class NoteTabs extends Component {

  state = {activeIndex: 0}

  handleTabChange = e => {
    console.log(e.target);
    console.log('in tab change');
  }

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
    const { notes } = this.props

    const panes = notes
    .map((note) => {
      return {
        menuItem: note.title,
        render: () => <NoteTab note={note} />
      }
    })

    return(
      <Tab panes={panes} onTabChange={this.handleTabChange}  />
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    notes: state.notes.list
           .filter(note => note.active)
           .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)),
    token: state.auth.token,
    tokenExpiresAt: state.auth.tokenExpiresAt,
    updatedNotes: state.notes.updatedNotes
  }
}

export default connect(mapStateToProps, { fetchNotes, batchUpdateNotes, logOut })(NoteTabs)
