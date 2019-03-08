import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import "../App.css"

//import { Dropdown } from 'Dropdown';

// const Student = props => (
//     <tr>
//         <td>{props.student.FirstName}</td>
//         <td>{props.student.LastName}</td>
//         <td>{props.student.SchoolName}</td>
//         <td>
//             <Link to={"/edit/"+props.student.ID}>Edit</Link>
//         </td>
//     </tr>
// )


export default class EditStudent extends Component {

    constructor(props) {
        super(props);

        this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
        this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
        this.onChangeStudentSchool = this.onChangeStudentSchool.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            FirstName: '',
            LastName: '',
            SchoolName: '',
            Status: 'Select a Status',
            StatusOptions: [
                {
                    id: 0,
                    title: 'INACTIVE',
                    selected: false,
                    key: 'StatusOptions'
                },
                {
                    id: 1,
                    title: 'ACTIVE',
                    selected: true,
                    key: 'StatusOptions'
                }
            ]
        }
    }

    resetThenSet = (id, key) => {
        let options = JSON.parse(JSON.stringify(this.state[key]));
        options.forEach(item => item.selected = false);
        options[id].selected = true;
        this.setState({
            [key]: options,
            Status: options[id].title
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/Students/' + this.props.match.params.id)
            .then(response => {
                let options = JSON.parse(JSON.stringify(this.state.StatusOptions));
                options.forEach(item => item.selected = false);
                options[response.data[0].Status].selected = true;
                this.setState({
                    FirstName: response.data[0].FirstName,
                    LastName: response.data[0].LastName,
                    SchoolName: response.data[0].SchoolName,
                    StatusOptions: options,
                    Status: options[response.data[0].Status].title
                })

            })
            .catch(function (error) {
                console.log(error);
            })
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

    onSubmit(e) {
        e.preventDefault();
        const statusID = this.state.StatusOptions.filter(option => (option.selected === true))[0].id;
        const obj = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            SchoolName: this.state.SchoolName,
            ID: parseInt(this.props.match.params.id),
            Status: statusID
        };
        console.log(obj);
        axios.put('http://localhost:8080/api/Students/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');

    }

    render() {
        return (
            <div className="input-container">
                <h3 align="center">Update Student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input
                            type="text"
                            className="form-control input-box"
                            value={this.state.FirstName}
                            onChange={this.onChangeStudentFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input
                            type="text"
                            className="form-control input-box"
                            value={this.state.LastName}
                            onChange={this.onChangeStudentLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>School Name: </label>
                        <input
                            type="text"
                            className="form-control input-box"
                            value={this.state.SchoolName}
                            onChange={this.onChangeStudentSchool}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status: </label>
                        <div className="input-box">

                            <Dropdown
                                className="form-control"
                                title={this.state.Status}
                                list={this.state.StatusOptions}
                                resetThenSet={this.resetThenSet}
                            />
                        </div>
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}