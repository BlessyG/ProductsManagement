import React, { Component } from 'react';
import { Button, Icon, Modal, Confirm } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';



export class FetchProducts extends Component {
    static displayName = FetchProducts.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [], loading: true, isAddProduct: false, open: false, name: '', price:0 , modalOpen: false, productId: 0, editModalOpen: false
        };

        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderProductsTable = this.renderProductsTable.bind(this);
        this.handleProductChanges = this.handleProductChanges.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidMount() {
        this.populateProductData();
    }
    async populateProductData() {
        const response = await fetch('api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }



    async handleConfirm() {
        const id = this.state.custId;
        await fetch('api/products/' + id, {
            method: 'Delete'
        }).then(products => {
            this.setState(
                {
                    products: this.state.products.filter((rec) => {
                        return (rec.id != id);
                    })
                });
        });
        this.setState({ open: false });
    }
    async handleProductChanges() {
        console.log("retrieved value" + this.state.name + "Price : " + this.state.price + "Id : " + this.state.productId);
        const editId = this.state.productId;
        if (editId > 0) {
            const data = { id: editId, name: this.state.name, price: Number(this.state.price) };
            const req = JSON.stringify(data);
            console.log("request : " + req);
            const response = await fetch('api/Products/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: req
            });
        } else {
            
            const data = { name: this.state.name, price: Number(this.state.price) };
            console.log(data);
            const req = JSON.stringify(data);
            await fetch('api/Products', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: req
            });
        }


        const prodResponse = await fetch('api/Products');
        const prodData = await prodResponse.json();
        this.setState({
            products: prodData, modalOpen: false, editModalOpen: false
        });

    }
    handleNameChange = (event) => this.setState({ name: event.target.value })
    handlePriceChange = (event) => this.setState({ price: event.target.value })
    handleOpen = () => this.setState({ modalOpen: true })
    editHandleOpen = () => this.setState({ editModalOpen: true })
    handleClose = () => this.setState({ modalOpen: false, open: false, editModalOpen: false })
    show = (id) => this.setState({ open: true, custId: id })
    updateProduct = (id, editName, prodPrice) => this.setState({ name: editName, productId: id, price: prodPrice, editModalOpen: true })




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
                        <br />    Price<br /><br />
                        <div className="ui input fluid">
                            <input type="text" name="price" value={this.state.value} onChange={this.handlePriceChange} />
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.handleClose}>
                            cancel
                            </Button>
                        <Button color="teal" onClick={this.handleProductChanges}>
                            create<Icon name='check' />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }

    renderProductsTable(products) {
        return (
            <div>
                <div>
                    <table className="ui striped table" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((productList) =>
                                <tr key={productList.id}>
                                    <td>{productList.name}</td>
                                    <td>{productList.price}</td>
                                    <td>
                                        <Modal trigger={<Button color='yellow' ><Icon name='edit' onClick={this.editHandleOpen} />Edit</Button>} open={this.state.editModalOpen} onOpen={() => this.updateProduct(productList.id, productList.name, productList.price)}>

                                            <Modal.Header>Edit Product</Modal.Header>
                                            <Modal.Content>

                                                Name<br /><br />
                                                <div className="ui input fluid">
                                                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                                                </div>
                                                <br />    Price<br /><br />
                                                <div className="ui input fluid">
                                                    <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} />
                                                </div>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color="black" onClick={this.handleClose}>
                                                    cancel
                            </Button>
                                                <Button color="teal" onClick={this.handleProductChanges}>
                                                    update<Icon name='check' />
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </td>
                                    <td><Button color='red' onClick={() => this.show(productList.id)}><Icon name='trash' />Delete
                                    <Confirm
                                            open={this.state.open}
                                            header='Delete product'
                                            onCancel={this.handleClose}
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
            : this.renderProductsTable(this.state.products);
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
