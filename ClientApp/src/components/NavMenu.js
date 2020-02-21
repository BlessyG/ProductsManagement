import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-lg bg-dark mb-3 navbar-dark" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">React</NavbarBrand>
                       
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex " isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav ">
                                <NavItem>
                                    <NavLink tag={Link} className="text-grey" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-grey" to="/fetch-customers">Customers</NavLink>
                                </NavItem>  
                                <NavItem>
                                    <NavLink tag={Link} className="text-grey" to="/table-listing">Table Listing</NavLink>
                                </NavItem>
                                
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
