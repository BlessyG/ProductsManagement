import React, { Component } from 'react';
import { Button, Icon, Modal, Confirm } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';



export class FetchStores extends Component {
    static displayName = FetchStores.name;

    constructor(props) {
        super(props);
        this.state = {
            stores: [], loading: true, open: false, name: '', address: '', modalOpen: false, storeId: 0, editModalOpen: false
        };

        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderStoresTable = this.renderStoresTable.bind(this);
        this.handleStoreChanges = this.handleStoreChanges.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidMount() {
        this.populateStoreData();
    }
    async populateStoreData() {
        const response = await fetch('api/Stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }



    async handleConfirm() {
        const id = this.state.storeId;
        await fetch('api/Stores/' + id, {
            method: 'Delete'
        }).then(stores => {
            this.setState(
                {
                    stores: this.state.stores.filter((rec) => {
                        return (rec.id != id);
                    })
                });
        });
        this.setState({ open: false });
    }
    async handleStoreChanges() {
        console.log("retrieved value" + this.state.name + "Address : " + this.state.address + "Id : " + this.state.storeId);
        const editId = this.state.storeId;
        if (editId > 0) {
            const data = { id: editId, name: this.state.name, address: this.state.address };
            const req = JSON.stringify(data);
            console.log("request : " + req);
            const response = await fetch('api/Stores/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: req
            });
        } else {
            const data = { name: this.state.name, address: this.state.address };
            const req = JSON.stringify(data);
            await fetch('api/Stores', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: req
            });
        }


        const storeResponse = await fetch('api/Stores');
        const storeData = await storeResponse.json();
        this.setState({
            stores: storeData, modalOpen: false, editModalOpen: false, storeId:0
        });

    }
    handleNameChange = (event) => this.setState({ name: event.target.value })
    handleAddressChange = (event) => this.setState({ address: event.target.value })
    handleOpen = () => this.setState({ modalOpen: true })
    editHandleOpen = () => this.setState({ editModalOpen: true })
    handleClose = () => this.setState({ modalOpen: false, open: false, editModalOpen: false })
    show = (id) => this.setState({ open: true, storeId: id })
    updateStore = (id, editName, sAddress) => this.setState({ name: editName, storeId: id, address: sAddress, editModalOpen: true })




    renderModal() {
        return (
            <div>
                <Modal trigger={<Button color='blue' onClick={this.handleOpen}>Create Store</Button>} open={this.state.modalOpen} centered={true} >
                    <Modal.Header>Create Store</Modal.Header>
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
                        <Button color="teal" onClick={this.handleStoreChanges}>
                            create<Icon name='check' />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }

    renderStoresTable(stores) {
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
                            {stores.map((storeList) =>
                                <tr key={storeList.id}>
                                    <td>{storeList.name}</td>
                                    <td>{storeList.address}</td>
                                    <td>
                                        <Modal trigger={<Button color='yellow' ><Icon name='edit' onClick={this.editHandleOpen} />Edit</Button>} open={this.state.editModalOpen} onOpen={() => this.updateStore(storeList.id, storeList.name, storeList.address)}>

                                            <Modal.Header>Edit Store</Modal.Header>
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
                                                <Button color="black" onClick={this.handleClose}>
                                                    cancel
                            </Button>
                                                <Button color="teal" onClick={this.handleStoreChanges}>
                                                    update<Icon name='check' />
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </td>
                                    <td><Button color='red' onClick={() => this.show(storeList.id)}><Icon name='trash' />Delete</Button>
                                    <Confirm
                                            open={this.state.open}
                                            header='Delete store'
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
            : this.renderStoresTable(this.state.stores);
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
