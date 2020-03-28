import React from 'react'
import { connect } from 'react-redux'
import { toggleActiveNote } from './actions'
import { Menu } from 'semantic-ui-react'

const SideMenuItem = ({ note, toggleActiveNote, token }) => {

  const handleClick = () => {
    toggleActiveNote(note,token)
  }

  return(
    <Menu.Item
      className='side-menu-item'
      name={note.title}
      onClick={handleClick}
    />
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { toggleActiveNote })(SideMenuItem)
