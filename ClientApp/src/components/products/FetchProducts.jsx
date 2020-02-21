import React, { Component } from 'react';
import { Button, Icon, Modal, Confirm } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';



export class FetchProducts extends Component {
    static displayName = FetchProducts.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [], loading: true, isAddCustomer: false, open: false, name: '', address: '', modalOpen: false, customerId: 0, editModalOpen: false
        };
        this.updateCustomer = this.updateCustomer.bind(this);
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderCustomersTable = this.renderCustomersTable.bind(this);
        this.handleCustomerChanges = this.handleCustomerChanges.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }
    async populateCustomerData() {
        const response = await fetch('api/Customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    updateCustomer(id, editName, cAddress) {
        console.log('inside updateCustomer()' + id + ' name:' + editName + ' address ' + cAddress);
        this.setState({ name: editName, customerId: id, address: cAddress, editModalOpen: true });
    }
    show(id) {
        this.setState({ open: true, custId: id });
    }
    async handleConfirm() {

        const id = this.state.custId;
        await fetch('api/Customers/' + id, {
            method: 'Delete'
        }).then(customers => {
            this.setState(
                {
                    customers: this.state.customers.filter((rec) => {
                        return (rec.id != id);
                    })
                });
        });
        this.setState({ open: false });
    }
    handleCancel(e) {
        e.preventDefault();
        this.setState({ open: false });
    }
    async handleCustomerChanges() {
        console.log("retrieved value" + this.state.name + "Address : " + this.state.address + "Id : " + this.state.customerId);
        const editId = this.state.customerId;
        if (editId > 0) {
            const data = { id: editId, name: this.state.name, address: this.state.address };
            const req = JSON.stringify(data);
            console.log("request : " + req);
            const response = await fetch('api/Customers/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: req
            });
        } else {
            const data = { name: this.state.name, address: this.state.address };
            const req = JSON.stringify(data);
            //  this.setState(this.customers[name] = this.state.name, this.customers[address] = this.state.address);
            const response = await fetch('api/Customers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: req
            });
        }


        const custResponse = await fetch('api/Customers');
        const custData = await custResponse.json();
        this.setState({
            customers: custData, modalOpen: false, editModalOpen: false
        });

    }
    handleNameChange = (event) => this.setState({ name: event.target.value })
    handleAddressChange = (event) => this.setState({ address: event.target.value })
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    editHandleOpen = () => this.setState({ editModalOpen: true })
    editHandleClose = () => this.setState({ editModalOpen: false })


    renderModal() {
        return (
            <div>
                <Modal trigger={<Button color='blue' onClick={this.handleOpen}>Create Product</Button>} open={this.state.modalOpen} centered={true} >
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>

                        Name<br /><br />
                        <div className="ui input fluid">
                            <input type="text" name="name" value={this.state.value} onChange={this.handleNameChange} />
                        </div>
                        <br />    Address<br /><br />
                        <div className="ui input fluid">
                            <input type="text" name="address" value={this.state.value} onChange={this.handleAddressChange} />
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.handleClose}>
                            cancel
                            </Button>
                        <Button color="teal" onClick={this.handleCustomerChanges}>
                            create<Icon name='check' />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }

    renderCustomersTable(customers) {
        return (
            <div>
                <div>
                    <table className="ui striped table" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customerList) =>
                                <tr key={customerList.id}>
                                    <td>{customerList.name}</td>
                                    <td>{customerList.address}</td>
                                    <td>
                                        <Modal trigger={<Button color='yellow' ><Icon name='edit' onClick={this.editHandleOpen} />Edit</Button>} open={this.state.editModalOpen} onOpen={() => this.updateCustomer(customerList.id, customerList.name, customerList.address)}>

                                            <Modal.Header>Edit Product</Modal.Header>
                                            <Modal.Content>

                                                Name<br /><br />
                                                <div className="ui input fluid">
                                                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                                                </div>
                                                <br />    Address<br /><br />
                                                <div className="ui input fluid">
                                                    <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} />
                                                </div>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color="black" onClick={this.editHandleClose}>
                                                    cancel
                            </Button>
                                                <Button color="teal" onClick={this.handleCustomerChanges}>
                                                    update<Icon name='check' />
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </td>
                                    <td><Button color='red' onClick={() => this.show(customerList.id)}><Icon name='trash' />Delete
                                    <Confirm
                                            open={this.state.open}
                                            header='Delete Product'
                                            onCancel={this.handleCancel}
                                            onConfirm={this.handleConfirm}
                                        /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table></div></div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomersTable(this.state.customers);
        let modalContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderModal();


        return (
            <div>
                {modalContents}
                <div class="ui horizontal divider"></div>
                {contents}
            </div>

        );
    }

}
