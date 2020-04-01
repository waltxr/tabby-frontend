import React, { Component } from 'react'
import './App.css';
import { signup } from './actions'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'



const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
}

class Signup extends Component {

  state = initialState

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { signup } = this.props
    signup(this.state)
    this.setState({
      initialState
    })
  }

  render() {

    if (this.props.auth.authenticated) {
      return <Redirect to='/notes' />
    }

    return (
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          { this.props.auth.authenticating ?
            <Dimmer active>
              <Loader size='massive'>Signing up...</Loader>
            </Dimmer>
            :
            <div>
              <Header as='h2' textAlign='center' className='signup-header'>
                Sign up for a Tabby account
              </Header>

              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment style={{ backgroundColor: '#131356'}} >
                  {
                    this.props.auth.signupError ?
                    <Message color='red' size='mini'>
                      {this.props.auth.signupError}
                    </Message>:
                    null
                  }
                  <Form.Input
                    className='signup-form-input'
                    fluid
                    icon='write square'
                    iconPosition='left'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    name='name'
                  />
                  <Form.Input
                    className='signup-form-input'
                    fluid
                    icon='at'
                    iconPosition='left'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    name='email'
                  />
                  <Form.Input
                    className='signup-form-input'
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    name='username'
                  />
                  <Form.Input
                    className='signup-form-input'
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    name='password'
                    type='password'
                  />
                  <Form.Input
                    className='signup-form-input'
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm that password'
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    name='password_confirmation'
                    type='password'
                  />
                  <Button type='submit' className='signup-button' fluid size='large'>
                    Sign up
                  </Button>
                </Segment>
              </Form>
              <Link id='login-button' to='login'>Log In</Link>
            </div>
          }
        </Grid.Column>
      </Grid>
    )

  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { signup })(Signup)
