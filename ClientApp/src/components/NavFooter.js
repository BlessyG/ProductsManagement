import React, { Component } from "react";

export class NavFooter extends Component {
    static displayName = NavFooter.name;

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                
                <div class="ui inverted divider"></div>
                <div >
                    © Blessy Gnanamanickam 
                    
                 </div>
                <div class="ui horizontal divider"></div>
                </div>
            );
    }
}