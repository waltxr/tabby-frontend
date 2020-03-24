import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchNotes } from './actions'
import { Tab } from 'semantic-ui-react'
import NoteTab from './NoteTab'


class NoteTabs extends Component {

  componentDidUpdate() {
    debugger
    // if (this.props.currentUser) {
    //   this.props.fetchNotes()
    // } else {
    //   console.log('oooh check NotesTab');
    // }
  }

  render() {
    console.log('in note tabs');

    let panes = []

    if (this.props.notes) {
      panes = this.props.notes.map(note => {
        console.log('in map function');
        return {
          menuItem: note.title,
          render: () => <NoteTab body={note.body} title={note.title}/>
        }
      })
    }

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
    notes: state.notes.list
  }
}

export default connect(mapStateToProps, { fetchNotes })(NoteTabs)
