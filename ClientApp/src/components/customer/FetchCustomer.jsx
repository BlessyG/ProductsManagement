import React, { Component } from 'react';
import { Button, Form, Icon, Modal, Confirm } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



export class FetchCustomer extends Component {
    static displayName = FetchCustomer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, isAddCustomer: false, open: false, custId: 0 };
        this.updateCustomer = this.updateCustomer.bind(this);
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderCustomersTable = this.renderCustomersTable.bind(this);

    }

    componentDidMount() {
        this.populateCustomerData();
    }
    async populateCustomerData() {
        const response = await fetch('api/Customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    updateCustomer(id) {
        console.log('inside updateCustomer()'+id);
        //alert("Test Code");
        //this.props.history.push("/customer/add-customer/" + id);
    }
    show(id)
    {
        return this.setState({ open: true, custId:id });
    }
    handleConfirm() {
        
        const id = this.state.custId ;      
        fetch('api/Customers/' + id, {
            method: 'Delete'
        }).then(customers => {
                this.setState(
                    {
                        customers:this.state.customers.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
        });
        this.setState({ open: false });
    }
    handleCancel() {
        this.setState({ open: false });
    }  
   

    renderCustomersTable(customers) {
        return (
            <div>
                <div>
                    <Modal trigger={<Button color='blue' onClick={() => this.createCustomer}>Create Customer</Button>} >
                        <Modal.Header>Create Customer</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>Name</label>
                                    <input placeholder="First Name" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label>
                                    <input placeholder="Last Name" />
                                </Form.Field>
                                <Button color="black">cancel</Button>
                                <Button type="submit" color="teal">
                                    create
                            </Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </div>
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
                                    <td><Button color='yellow' onClick={() => this.updateCustomer(customerList.id)}><Icon name='edit' />Edit</Button></td>
                                    <td><Button color='red' onClick={() => this.show(customerList.id)}><Icon name='trash' />Delete
                                    <Confirm
                                        open={this.state.open}
                                        header='Delete customer'
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


        return (
            <div>
                {contents}
            </div>

        );
    }

}
