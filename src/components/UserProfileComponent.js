import React, { Component } from 'react';
import { Table } from 'reactstrap';

class UserProfile extends Component{
    constructor(props){
        super(props);
    }

    renderGender(gender){
        if(gender === 'M'){
            return(
                <td>Male</td>
            )
        }else if(gender === 'F'){
            return(
                <td>Female</td>
            )
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-2"/>
                    <div className="col-12 col-md-8" >
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Your Profile</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Your Name</th>
                                    <td>{this.props.userInfo.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Your User ID</th>
                                    <td>{this.props.userInfo.user_id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Your Password</th>
                                    <td>{this.props.userInfo.password}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Your Address</th>
                                    <td>{this.props.userInfo.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Your Gender</th>
                                    <td>{this.renderGender(this.props.userInfo.gender)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div> 
                
                </div>
                
            </div>
        );
    }
}

export default UserProfile;