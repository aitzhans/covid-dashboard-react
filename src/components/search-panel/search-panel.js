import React, { Component } from 'react';

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.state = {
      term: ''
    };
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    // console.log(term);
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <div className="content__search-container">
        <input
          className="content__search  content__search--countries"
          onChange={this.onSearchChange}
          placeholder="Search by Country..."
        />
        <div className="content__search--suggestions" />
      </div>
    );
  }
}
