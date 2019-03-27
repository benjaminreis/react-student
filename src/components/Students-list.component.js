import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import "bootstrap/dist/css/bootstrap.min.css";

// const Student = props => (
//     <tr>
//         <td>{props.student.FirstName}</td>
//         <td>{props.student.LastName}</td>
//         <td>{props.student.SchoolName}</td>
//         <td>
//             <Link to={"/edit/" + props.student.ID}>Edit</Link>
//         </td>
//     </tr>
// )

const Student = props => (
    <tr style={{height:49}}>
        <td>{props.student.FirstName}</td>
        <td>{props.student.LastName}</td>
        <td>{props.student.SchoolName}</td>
        <td>
            {props.student.ID >0 ? <Link to={"/edit/" + props.student.ID}>Edit</Link> :' ' }
        </td>
    </tr>

)

export default class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/Students/')
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    studentList() {
        return this.state.students.map(function (currentStudent, i) {
            return <Student student={currentStudent} key={i} />;
            //<Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />

        })
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className="container" >
                <h3>Student List</h3>
                <table className="table table-striped" style={{ marginTop: 20}} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody style={{Height:500}}> 
                        {/* {this.studentList()} */}
                        {this.state.pageOfItems.map(item =>
                            // <tr>
                            //     <td key={item.ID}>{item.FirstName}</td>
                            //     <td>{item.LastName}</td>
                            //     <td>{item.SchoolName}</td>
                            //     <td>
                            //         <Link to={"/edit/" + item.ID}>Edit</Link>
                            //     </td>
                            // </tr>
                            <Student student={item}></Student>
                        )}
                    </tbody>
                </table>
                <Pagination items={this.state.students} onChangePage={this.onChangePage} />

            </div>
        )
    }
}