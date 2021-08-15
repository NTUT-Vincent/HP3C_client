import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
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
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    render() {
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
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
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