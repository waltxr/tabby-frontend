import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import SideMenuItem from './SideMenuItem'


const SideMenu = (props) => {

  const menuItems = props.notes.reverse().map(note => {
    return <SideMenuItem note={note} key={note.id}/>
  })

  return(
    <Menu text vertical>
      { menuItems }
    </Menu>
  )

}

const mapStateToProps = state => {
  return {
    notes: state.notes.list.filter(note => !note.active)
  }
}

export default connect(mapStateToProps)(SideMenu)
