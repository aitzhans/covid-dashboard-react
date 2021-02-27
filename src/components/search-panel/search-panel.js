import React, { Component } from 'react';

export default class SearchPanel extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     term: ''
  //   };
  // }

  onSearchChange = (e) => {
    const term = e.target.value;
    // this.setState({ term });
    this.props.onSearchChange(term);
  }

  onBlur = (e) => {
    e.target.value = '';
    // this.setState({ term: '' });
  }

  render() {
    return (
      <div className="content__search-container">
        <input
          className="content__search  content__search--countries"
          onChange={this.onSearchChange}
          onBlur={this.onBlur}
          placeholder="Search by Country..."
        />
        <div className="content__search--suggestions" />
      </div>
    );
  }
}
