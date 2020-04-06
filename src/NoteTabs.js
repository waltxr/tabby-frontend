import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes, batchUpdateNotes, logOut } from './actions'
import { Tab, Segment } from 'semantic-ui-react'
import NoteTab from './NoteTab'
import NotePlaceholderSegment from './NotePlaceholderSegment'


class NoteTabs extends Component {

  state = {activeIndex: 0}

  handleTabChange = e => {
    let child = e.target
    let i = 0
    while ((child = child.previousSibling) != null) {
      i++
    }
    this.setState({activeIndex: i})
  }

  runBatchUpdates = () => {
    const { tokenExpiresAt, logOut, token, updatedNotes, notes, batchUpdateNotes } = this.props
    if (Date.parse(tokenExpiresAt) < Date.now()) {
      logOut()
      clearInterval(this.interval)
    } else {
      if (updatedNotes.length > 0) {
        let notesToUpdate = notes.filter(note => updatedNotes.includes(note.id))
        batchUpdateNotes(notesToUpdate, token, tokenExpiresAt)
      }
    }
  }

  setIndexFromTabClose = () => {
    const { activeIndex } = this.state
    if (activeIndex !== 0) {
      this.setState({activeIndex: activeIndex-1})
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
        render: () => <NoteTab note={note} handleSetTabClose={this.setIndexFromTabClose} key={note.id}/>
      }
    })

    return(
      <div>
      {
        notes.length > 0
        ?
        <Tab panes={panes} onTabChange={this.handleTabChange} activeIndex={this.state.activeIndex} />
        :
        <NotePlaceholderSegment />
      }
      </div>
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
