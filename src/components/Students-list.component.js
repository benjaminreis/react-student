import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.FirstName}</td>
        <td>{props.student.LastName}</td>
        <td>{props.student.SchoolName}</td>
        <td>
            <Link to={"/edit/"+props.student.ID}>Edit</Link>
        </td>
    </tr>
)

export default class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/Students/')
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    studentList() {
        return this.state.students.map(function(currentStudent, i){
            return <Student student={currentStudent} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Student List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentList() }
                    </tbody>
                </table>
            </div>
        )
    }
}