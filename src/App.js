// IMPORT PACKAGES, REACT FIRST
import React from 'react';
import axios from 'axios';

// IMPORT ASSETS (IMAGES, STYLES, ETC)
import logo from './img/logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// IMPORT COMPONENTS
import {Component} from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import EventForm from './EventForm';
import LoginForm from './LoginForm';
// import DisplayLoginInfo from './DisplayLoginInfo';

class App extends Component {
  constructor(props) {
    super(props)

    // set vars that don't change, ie not state
    this.backend = 'http://localhost:4741'

    // set vars to describe the state of the App component
    this.state = {
      auth: {
        userName: '',
        password: '',
        token: null
      },
      _triggerChildren: { // changing these values at all trigger actions in certain child components
        getEventsRequest: false
      }
    }

    // bind 'this' context to class methods
    const bindMethods = ['loginRequest', 'userNameChange', 'passwordChange', 'loginSubmit']
    bindMethods.forEach(method => {
      this[method] = this[method].bind(this)
    })

  }

  // trick to get auto-login on load (remove later)
  componentDidMount() {
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      newState.auth.userName = 'acarlotto@cox.net'
      newState.auth.password = 'summer'
      return newState
    }, this.loginRequest)
  }

  // HTTP REQUESTS
  loginRequest() {
    axios
      .post(`${this.backend}/sign-in`, {
      credentials: {
        email: this.state.auth.userName,
        password: this.state.auth.password
      }
    })
      .then(response => {
        const authToken = response.data.user.token
        this.setState(prevState => {
          const newState = Object.assign({}, prevState)
          newState.auth.token = authToken
          return newState
        })
      })
      .then(() => {
        this.setState(prevState => {
          const newState = Object.assign({}, prevState)
          newState._triggerChildren.getEventsRequest = !newState._triggerChildren.getEventsRequest
          return newState
        })
      })
      .catch(error => {
        console.error('login failed!', error)
      })
  }

  // EVENT HANDLERS
  userNameChange(event) {
    const userName = event.target.value
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      newState.auth.userName = userName
      return newState
    })
  }

  passwordChange(event) {
    const password = event.target.value
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      newState.auth.password = password
      return newState
    })
  }

  loginSubmit(event) {
    event.preventDefault()
    this.loginRequest()
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
              <img src={logo} alt="logo"/>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem></NavItem>
                <NavItem onClick={this.handleSignOut}>Sign out</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
          <h1 className="App-title">Weddingzeal</h1>
        </header>
        
        <img src={logo} alt="logo"/>
        <LoginForm
          password={this.state.auth.password}
          username={this.state.auth.userName}
          userNameChange={this.userNameChange}
          passwordChange={this.passwordChange}
          loginSubmit={this.loginSubmit}/>
          <br />
          <br />
        {/* <DisplayLoginInfo
          password={this.state.auth.password}
          username={this.state.auth.userName}
          token={this.state.auth.token}/> */}
        <EventForm
          triggerGetEvents={this.state._triggerChildren.getEventsRequest}
          backend={this.backend}
          auth={this.state.auth}
          />
      </div>
    );
  }
}

export default App;