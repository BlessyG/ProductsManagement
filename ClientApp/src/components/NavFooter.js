import React, { Component } from "react";

export class NavFooter extends Component {
    static displayName = NavFooter.name;

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                
                <div className="ui inverted divider"></div>
                <div >
                    © Blessy Gnanamanickam 
                    
                 </div>
                <div className="ui horizontal divider"></div>
                </div>
            );
    }
}