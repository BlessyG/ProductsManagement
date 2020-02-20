import React, { Component } from 'react';
import { Button, Icon, Modal, Confirm } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



export class FetchCustomer extends Component {
    static displayName = FetchCustomer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, isAddCustomer: false, open: false};
        this.updateCustomer = this.updateCustomer.bind(this);
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderCustomersTable = this.renderCustomersTable.bind(this);
        this.handleCustomerChanges = this.handleCustomerChanges.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.renderModal = this.renderModal.bind(this);
        const updatedInfo = {
            custId: 0,
            name: '',
            address:''
        };
    }

    componentDidMount() {
        this.populateCustomerData();
    }
    async populateCustomerData() {
        const response = await fetch('api/Customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    updateCustomer(id,editName,address) {
        console.log('inside updateCustomer()' + id + ' name:' + editName + ' address ' + address);
        //fetch('api/Employee/Details/' + empid)

        //    .then(response => response.json() as Promise<EmployeeData>)

        //    .then(data => {

        //        this.setState({ title: "Edit", loading: false, empData: data });

        //    });  
    }
    show(id)
    {
        this.setState({ open: true, custId: id });
    }
    async handleConfirm() {
        
        const id = this.state.custId ;      
        await fetch('api/Customers/' + id, {
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
    handleCancel(e) {
        e.preventDefault();
        this.setState({ open: false });        
    }  
    handleCustomerChanges(){
        console.log("retrieved value"+this.state.name+"Address : "+this.state.address);
    }
    handleNameChange(event) {     
        this.setState({ name: event.target.value });
    }
    handleAddressChange(event) {
        this.setState({ address: event.target.value });
    }

    renderModal() {
        return (
            <div>
                <Modal trigger={<Button color='blue' onClick={() => this.createCustomer}>Create Customer</Button>} >
                    <Modal.Header>Create Customer</Modal.Header>
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
                        <Button color="black" onClick={this.handleCancel}>
                            cancel
                            </Button>
                        <Button color="teal" onClick={this.handleCustomerChanges}>
                            create<Icon name='check'/>
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
                                    <td><Button color='yellow' onClick={() => this.updateCustomer(customerList.id, customerList.name, customerList.address)}><Icon name='edit' />Edit</Button></td>
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
        let modalContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderModal();


        return (
            <div>
                {modalContents}
                {contents}
            </div>

        );
    }

}
