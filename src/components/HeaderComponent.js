import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { baseUrl } from '../shared/baseUrl';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            logged: false,
            userType: ''
        };
    }


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        // alert("Username: " + this.username.value + " Password: " + this.password.value
        //     + " Remember: " + this.remember.checked);
        this.validateUserLogin(this.username.value, this.password.value)
        event.preventDefault();
    }

    handleLogout(event) {
        this.setState({
            logged: false
        });
        this.props.addUserInfo({});
        event.preventDefault();
    }

    renderUserOptionColumns(){
        return(
            <div>
                <DropdownItem className="navbar-dark-option">
                    <NavLink className="nav-link" to="/userProfile" >User Profile</NavLink>
                </DropdownItem>
                <DropdownItem className="navbar-dark-option">
                    <NavLink className="nav-link" to="/product/gpu">Order</NavLink>
                </DropdownItem>
            </div>
        );
    }

    renderLoginOrLogoutButton(){
        return(
            <div>
                {
                    this.state.logged 
                    ? <Button outline onClick={this.handleLogout}><span className="fa fa-sign-in fa-lg"></span> Logout</Button>
                    : <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                }
            </div>
        );
    }

    validateUserLogin(username, password){
        fetch(baseUrl + 'api/user/login/' + username + '/' + password + '/')
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                var errmess = new Error(error.message);
                throw errmess;
          })
        .then(response => response.json())
        .then(response => {   
            console.log(response);
            this.props.addUserInfo(response);
            this.setState({
                logged: true,
                userType: response.user_type
            });
        })
        .catch(error =>  { console.log('get comment', error.message); alert('This page has not been construsted\nError: '+error.message); })
    }

    render() {
        console.log('header state user: ', this.state);
        console.log('header state user: ', this.props.userInfo);
        return(
        <React.Fragment>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41"/></NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Product Types
                                </DropdownToggle>
                                <DropdownMenu right className="navbar-dark">
                                    <DropdownItem className="navbar-dark-option">
                                        <NavLink className="nav-link" to="/product/cpu" >CPU</NavLink>
                                    </DropdownItem>
                                    <DropdownItem className="navbar-dark-option">
                                        <NavLink className="nav-link" to="/product/gpu">GPU</NavLink>
                                    </DropdownItem>
                                    <DropdownItem className="navbar-dark-option">
                                        <NavLink className="nav-link" to="/product/ram">RAM</NavLink>
                                    </DropdownItem>
                                    <DropdownItem className="navbar-dark-option">
                                        <NavLink className="nav-link" to="/product/ssd">SSD</NavLink>
                                    </DropdownItem>
                                    <DropdownItem className="navbar-dark-option">
                                        <NavLink className="nav-link" to="/product/motherboard">motherboard</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className="navbar-dark-option">
                                <NavLink className="nav-link"  to='/product/'><span className="fa fa-home fa-lg"></span> Products</NavLink>
                            </NavItem>
                            <NavItem className="navbar-dark-option">
                                <NavLink className="nav-link" to='/'><span className="fa fa-info fa-lg"></span> Promotions</NavLink>
                            </NavItem>
                            <NavItem className="navbar-dark-option">
                                <NavLink className="nav-link"  to='/'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem className="navbar-dark-option">
                                <NavLink className="nav-link" to='/'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    User Option
                                </DropdownToggle>
                                <DropdownMenu right className="navbar-dark">
                                    {this.renderUserOptionColumns()}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>  
                    {this.renderLoginOrLogoutButton()}
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>High Price 3C Store</h1>
                            <p>We provide the best 3C products in the world. </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                innerRef={(input) => this.password = input}  />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember = input}  />
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}

export default Header;