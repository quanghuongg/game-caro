import Caro from './components/Caro';
import './App.css';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Information from './components/Profile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark"  >
          <Navbar.Brand>Game Caro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to={'/'} className="nav-link"> Home </Link>
              <Link to={'/my-info'} className="nav-link"> Profile </Link>
              <Link to={'/login'} className="nav-link"> Login </Link>
              <Link to={'/register'} className="nav-link"> Sign Up </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path='/Login' component={Login}/>

          <Route path='/Register' component={Register}/>

          <Route path='/my-info' component={Information}/>

          <Route path='/' component={Caro}/>

        </Switch>
      </Router>
    </div>
  );
}
