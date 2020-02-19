import React from 'react';

export class ListingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: []
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //ajax call logic
    }
    update(id) {
        //ajax call logic
    }

    delete(id) {
        //ajax call logic
    }

    render() {

        let serviceList = this.state.serviceList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service => 
                <tr key={service.id}>
                    <td className="two wide">{service.title}</td>
                    <td className="ten wide">{service.description}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={this.update.bind(this, service.id)}></i>
                        <i className="remove icon" onClick={this.delete.bind(this, service.id)}></i>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Title</th>
                                <th className="ten wide">Description</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
            </React.Fragment>
        )
    }
}
