import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateStudent from "./components/create-student.compontent";
import EditStudent from "./components/edit-students.component";
import StudentsList from "./components/Students-list.component";


import logo from "./logo.svg";
require('dotenv').config()


//Tutorial from here:  https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-4/
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Student Management App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Students</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Student</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={StudentsList} />
          <Route path="/edit/:id" component={EditStudent} />
          <Route path="/create" component={CreateStudent} />
        </div>

      </Router>
    );
  }
}

export default App;
