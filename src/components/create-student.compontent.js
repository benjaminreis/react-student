import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
//import { Dropdown } from 'reactjs-dropdown-component';
import Dropdown from "./Dropdown";

import "react-datepicker/dist/react-datepicker.css";
import "../App.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'





export default class CreateStudent extends Component {


    constructor(props) {
        super(props);

        this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
        this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
        this.onChangeStudentSchool = this.onChangeStudentSchool.bind(this);
        this.onChangeStudentGraduationDate = this.onChangeStudentGraduationDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            FirstName: '',
            LastName: '',
            SchoolName: '',
            GraduationDate: new Date(),
            Status: 'Select a Status',
            StatusOptions : [
                {
                    id: 0,
                    title: 'INACTIVE',
                    selected: false
                },
                {
                    id: 1,
                    title: 'ACTIVE',
                    selected: false
                }
            ]
        
        }
    }

    resetThenSet = (id) => {
        let options = JSON.parse(JSON.stringify(this.state.StatusOptions));
        options.forEach(item => item.selected = false);
        options[id].selected = true;
        this.setState({
            StatusOptions: options,
            Status: options[id].title
        });
    }

    onChangeStudentFirstName(e) {
        this.setState({
            FirstName: e.target.value
        });
    }

    onChangeStudentLastName(e) {
        this.setState({
            LastName: e.target.value
        });
    }

    onChangeStudentSchool(e) {
        this.setState({
            SchoolName: e.target.value
        });
    }

    onChangeStudentGraduationDate(date) {
        this.setState({
            GraduationDate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const statusID = this.state.StatusOptions.filter(option => (option.selected === true))[0].id;

        const newStudent = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            SchoolName: this.state.SchoolName,
            GraduationDate: this.state.GraduationDate,
            Status: this.state.Status,
            Status: statusID
        };
        var URL = 'http://localhost:8080/api/Students/';
        //var URL = 'http://localhost:5000/Students';
        Axios.post(URL, newStudent).then(res => console.log(res.data));

        this.setState({
            FirstName: '',
            LastName: '',
            SchoolName: '',
            GraduationDate: new Date(),
            Status: ''
            //TODO BEN you could calculate a default date... like decide whether may or december is next.  and then make it the first sat in may, or 2nd or 3rd sat in december
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }} className="input-container">
                <h3>Create Student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>FirstName: </label>
                        <input type="text"
                            className="form-control input-box"
                            value={this.state.FirstName}
                            onChange={this.onChangeStudentFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>LastName: </label>
                        <input
                            type="text"
                            className="form-control input-box"
                            value={this.state.LastName}
                            onChange={this.onChangeStudentLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>School: </label>
                        <input
                            type="text"
                            className="form-control input-box"
                            value={this.state.SchoolName}
                            onChange={this.onChangeStudentSchool}
                        />
                    </div>
                    <div className="form-group">
                        <label>Graduation Date: </label>
                        <div className="grad-date">
                            <DatePicker
                                className="form-control"
                                selected={this.state.GraduationDate}
                                onChange={this.onChangeStudentGraduationDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Status: </label>
                        <div className="input-box">
                            <Dropdown
                                className ="form-control status-dropdown"
                                title={this.state.Status}
                                list={this.state.StatusOptions}
                                resetThenSet={this.resetThenSet}
                            />
                        </div>
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}