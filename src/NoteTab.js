import React, { Component } from 'react';
import { Tab, TextArea, Form, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateNote, updateUpdatedNotes, destroyNote } from './actions'


class NoteTab extends Component {

  state = {note: this.props.note}

  static getDerivedStateFromProps(props, state) {
    if (props.note.id !== state.note.id) {
      return props
    }
    return null
  }

  handleChange = e => {
    const { value } = e.target

    const newState = {note: {
      ...this.state.note,
      body: value
    }}

    this.setState(newState)
    this.props.updateNote(newState.note)

    if (!this.props.updatedNotes.includes(newState.note.id)) {
      this.props.updateUpdatedNotes(newState.note.id)
    }

  }

  handleClose = () => {
    console.log('in close');
  }

  handleDelete = () => {
    this.props.destroyNote(this.props.note, this.props.token)
  }

  render() {
    return(
      <Tab.Pane>
        <Menu secondary>
          <Menu.Item onClick={this.handleClose}>close</Menu.Item>
          <Menu.Item onClick={this.handleDelete}>delete</Menu.Item>
        </Menu>
        <Form>
          <TextArea
            rows={25}
            value={this.state.note.body}
            onChange={this.handleChange}
          />
        </Form>
      </Tab.Pane>
    )
  }

}

const mapStateToProps = state => {
  return {
    updatedNotes: state.notes.updatedNotes,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { updateNote, updateUpdatedNotes, destroyNote })(NoteTab)
