import React, { Component } from 'react';

import './search-panel.css';

export default class SearhPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(evt) {        
        this.setState({
            term: evt.target.value
        });
        this.props.onUpdateSearch(evt.target.value);
    }

    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
        );
    }    
};

