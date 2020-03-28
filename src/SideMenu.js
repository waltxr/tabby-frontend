import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import SideMenuItem from './SideMenuItem'


const SideMenu = (props) => {

  const menuItems = props.notes.map(note => {
    return <SideMenuItem note={note} />
  })

  return(
    <Menu text vertical color='pink'>
      { menuItems }
    </Menu>
  )
}

const mapStateToProps = state => {
  console.log(state.notes.list.filter(note => note.active === false));
  return {
    notes: state.notes.list.filter(note => note.active === false)
  }
}

export default connect(mapStateToProps)(SideMenu)
