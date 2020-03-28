import React, { Component } from 'react';
import { Icon, Input, Tab, TextArea, Form, Menu, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateSingleNote, updateNote, updateUpdatedNotes, destroyNote, toggleActiveNote } from './actions'


class NoteTab extends Component {

  state = {
    note: this.props.note,
    renameFormActive: false
  }

  static getDerivedStateFromProps(props, state) {
    if (props.note.id !== state.note.id) {
      return props
    }
    return null
  }

  handleChange = e => {
    const { value } = e.target

    const newState = {
      ...this.state,
        note: {
        ...this.state.note,
        body: value
        }
    }

    this.setState(newState)
    this.props.updateNote(newState.note)

    if (!this.props.updatedNotes.includes(newState.note.id)) {
      this.props.updateUpdatedNotes(newState.note.id)
    }

  }

  handleClose = () => {
    this.props.toggleActiveNote(this.props.note, this.props.token)

  }

  handleDelete = () => {
    this.props.destroyNote(this.props.note, this.props.token)
  }

  toggleRenameFormActive = () => {
    this.setState({
      ...this.state,
      renameFormActive: !this.state.renameFormActive
    })
  }

  updateNoteTitle = () => {
    this.props.updateSingleNote(this.state.note, this.props.token)
    this.toggleRenameFormActive()
  }

  handleRenameChange = e => {
    const { value } = e.target

    const newState = {
      ...this.state,
        note: {
          ...this.state.note,
          title: value
      }
    }
    this.setState(newState)
  }

  render() {
    return(
      <Tab.Pane className='tab-pane'>
        <Menu secondary className='tab-menu'>
          <Menu.Item className='tab-menu-item' onClick={this.toggleRenameFormActive}>rename</Menu.Item>
          {
            this.state.renameFormActive
            ?
            <Input
              action={{
                icon: 'check square',
                onClick: () => this.updateNoteTitle()
              }}
              placeholder={this.props.note.title}
              onChange={this.handleRenameChange}
              value={this.state.note.title}

            />
            :
            null
          }
          <Menu.Item id='delete-button'  className='tab-menu-item' onClick={this.handleDelete}>delete</Menu.Item>
          <Menu.Item position='right'className='tab-menu-item' onClick={this.handleClose}><Icon size='large' name='window close'/></Menu.Item>
        </Menu>
        <Grid>
          <Grid.Column width={10}>
            <Form>
              <TextArea
                value={this.state.note.body}
                onChange={this.handleChange}
                className='text-area'
                style={{ minHeight: '95vh' }}
              />
            </Form>
          </Grid.Column>
        </Grid>
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

export default connect(mapStateToProps, { updateNote, updateUpdatedNotes, destroyNote, toggleActiveNote, updateSingleNote })(NoteTab)
