import React, { Component } from 'react';
import { Button, Icon, Modal, Confirm, Dropdown } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';



export class FetchSales extends Component {
    static displayName = FetchSales.name;

    constructor(props) {
        super(props);
        this.state = {
            sales: [], customerNames: [], productNames: [], storeNames: [],
            loading: true, deleteOpen: false, modalOpen: false, editModalOpen: false,
            enteredDate:'', customerId: 0, productId: 0, storeId: 0, salesId: 0,
            custName:'', prodName:'', storeName:''
        };

        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderSalesTable = this.renderSalesTable.bind(this);
        this.handleSalesChanges = this.handleSalesChanges.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidMount() {
        this.populateSaleData();
        this.populateCustomerName();
        this.populateProductName();
        this.populateStorename();
    }
    async populateSaleData() {       
        const response = await fetch('api/Sales');
        const data = await response.json();      
        console.log("Sales response: " + response);
        this.setState({ sales: data, loading: false });
        console.log("Sales Data Date: " + this.state.sales);
    }
    async populateCustomerName() {
        await fetch('api/Customers')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let customerDetails = data.map(names => {
                    return {  value: names.id, text: names.name }
                });
                this.setState({ customerNames: customerDetails });
            }).catch(error => {
                console.log(error);
            });
        console.log(this.state.customerNames);
    }
    async populateProductName() {
        await fetch('api/Products')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let productDetails = data.map(names => {
                    return { value: names.id, text: names.name }
                });
                this.setState({ productNames: productDetails });
            }).catch(error => {
                console.log(error);
            });
        console.log(this.state.productNames);
    }
    async populateStorename() {
        await fetch('api/Stores')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let storeDetails = data.map(names => {
                    return { value: names.id, text: names.name }
                });
                this.setState({ storeNames: storeDetails });
            }).catch(error => {
                console.log(error);
            });
        console.log(this.state.storeNames);
    }
    async handleConfirm() {
        const id = this.state.salesId;
        console.log("sales id in delete" +id);
        await fetch('api/Sales/' + id, {
            method: 'Delete'
        }).then(sales => {
            this.setState(
                {
                    sales: this.state.sales.filter((rec) => {
                        return (rec.id != id);
                    })
                });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ deleteOpen: false });
    }
    async handleSalesChanges() {
        console.log("retrieved value" + this.state.enteredDate + "custId : " + this.state.customerId + " prodId : " + this.state.productId+"salesId: "+this.state.salesId);
        const editId = this.state.salesId;
        if (editId > 0) {
            const data = {
                id: editId,
                DateSold: this.state.enteredDate,
                ProductId: this.state.productId,
                CustomerId: this.state.customerId,
                StoreId: this.state.storeId
            };
            const req = JSON.stringify(data);
            console.log("request : " + req);
            const response = await fetch('api/Sales/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: req
            }).catch(error => {
                console.log(error);
            });
        } else {            
            const data = {
                DateSold: this.state.enteredDate,
                ProductId: this.state.productId,
                CustomerId: this.state.customerId,
                StoreId: this.state.storeId
            };
            const req = JSON.stringify(data);
            console.log("Request : "+ req);
            await fetch('api/Sales', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: req
            }).catch(error => {
                console.log(error);
            });
        }
        const salesResponse = await fetch('api/Sales').catch(error => {
            console.log(error);
        });
        const salesData = await salesResponse.json();
        this.setState({
            sales: salesData, modalOpen: false, editModalOpen: false, salesId: 0
        });

    }
    handleAddressChange = (event) => this.setState({ address: event.target.value })
    handleOpen = () => this.setState({ modalOpen: true })
    editHandleOpen = () => this.setState({ editModalOpen: true })
    handleClose = () => this.setState({ modalOpen: false, deleteOpen: false, editModalOpen: false })
    
    show = (id) => this.setState({ deleteOpen: true, salesId: id })
    updateSales = (sId, sDate, custId, prodId, stId) => {        
        const split = sDate.split('/');
        const modifiedDate = split[2] + "-" + split[0] + "-" + split[1];
        this.setState({ salesId: sId, enteredDate: modifiedDate, customerId: custId, productId: prodId, storeId: stId, editModalOpen: true });
    }
    handleDateChange = (event) => {
        console.log("Date : "+event.target.value);
        this.setState({ enteredDate: event.target.value });
    }
    handleCustomerChange = (event, {value}) => {
        this.setState({ customerId: value });
        console.log("customer ID : " + event.target.value + event + "value :::: " + value);
    }
    handleProductChange = (event, { value }) => {
        this.setState({ productId: value });
        console.log("product ID : " + event.target.value + event + "value :::: " + value);
    }
    handleStoreChange = (event, { value }) => {
        this.setState({ storeId: value });
        console.log("store ID : " + event.target.value + event + "value :::: " + value);
    }

    renderModal() {
        return (
            <div>
                <Modal trigger={<Button color='blue' onClick={this.handleOpen}>Create Sales</Button>} open={this.state.modalOpen} centered={true} >
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>

                        Date Sold<br />   
                        <div className="ui calendar" >
                            <div className="ui input"><input type="date" name="enteredDate" value={this.state.value} onChange={this.handleDateChange}/></div>
                        </div>

                        Customer<br />  
                        <Dropdown
                            placeholder=''
                            fluid
                            selection
                            options={this.state.customerNames}
                            onChange={this.handleCustomerChange}
                        />
                        Product<br />
                        <Dropdown
                            placeholder=''
                            fluid
                            selection
                            options={this.state.productNames}
                            onChange={this.handleProductChange}
                        />
                        Store<br />
                        <Dropdown
                            placeholder=''
                            fluid
                            selection
                            options={this.state.storeNames}
                            onChange={this.handleStoreChange}
                        />

                        <br />   
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.handleClose}>
                            cancel
                            </Button>
                        <Button color="teal" onClick={this.handleSalesChanges}>
                            create<Icon name='check' />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }

    renderSalesTable(sales) {
        return (
            <div>
                <div>
                    <table className="ui striped table" >
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>Date Sold</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((salesList) =>
                                <tr key={salesList.id}>
                                    <td>{salesList.customerName}</td>
                                    <td>{salesList.productName}</td>
                                    <td>{salesList.storeName}</td>
                                    <td>{salesList.dateSold}</td>
                                    <td>
                                        <Modal trigger={<Button color='yellow' ><Icon name='edit' onClick={this.editHandleOpen} />Edit</Button>} open={this.state.editModalOpen} onOpen={() => this.updateSales(salesList.id,salesList.dateSold, salesList.customerId, salesList.productId, salesList.storeId)}>

                                            <Modal.Header>Edit Sales</Modal.Header>
                                            <Modal.Content>
                                                Date Sold<br />
                                                <div className="ui calendar" >
                                                    <div className="ui input"><input type="date" name="enteredDate" value={this.state.enteredDate} onChange={this.handleDateChange} /></div>
                                                </div>

                                                Customer<br />
                                                <Dropdown
                                                    placeholder=''
                                                    fluid
                                                    selection
                                                    options={this.state.customerNames}
                                                    onChange={this.handleCustomerChange}
                                                    value={this.state.customerId}
                                                />
                                                Product<br />
                                                <Dropdown
                                                    placeholder=''
                                                    fluid
                                                    selection
                                                    options={this.state.productNames}
                                                    onChange={this.handleProductChange}
                                                    value={this.state.productId}
                                                />
                                                Store<br />
                                                <Dropdown
                                                    placeholder=''
                                                    fluid
                                                    selection
                                                    options={this.state.storeNames}
                                                    onChange={this.handleStoreChange}
                                                    value={this.state.storeId}
                                                />

                                                <br />   
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color="black" onClick={this.handleClose}>
                                                    cancel
                            </Button>
                                                <Button color="teal" onClick={this.handleSalesChanges}>
                                                    update<Icon name='check' />
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </td>
                                    <td><Button color='red' onClick={() => this.show(salesList.id)} ><Icon name='trash' />Delete</Button>
                                    <Confirm
                                            open={this.state.deleteOpen}
                                            header='Delete sales'
                                            onCancel={this.handleClose}
                                            onConfirm={this.handleConfirm}
                                        /></td>
                                </tr>
                            )}
                        </tbody>
                    </table></div></div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSalesTable(this.state.sales);
        let modalContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderModal();


        return (
            <div>
                {modalContents}
                <div className="ui horizontal divider"></div>
                {contents}
            </div>

        );
    }

}
