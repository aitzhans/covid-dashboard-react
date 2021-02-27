import React, { Component } from 'react';

class OptionsPanel extends Component {
  onChangeValue(event) {
    this.props.onFilterChange(event.target.value);
  }

  render() {
    return (
      <div className="content__options  options  options--countries" onChange={(e) => this.onChangeValue(e)}>
        <input
          className="options__input"
          value="totalConfirmed"
          type="radio"
          name="countries-options"
          id="countries-cases"
          defaultChecked
        />
        <label htmlFor="countries-cases" className="options__label">Cases</label>
        <input
          className="options__input"
          value="totalDeaths"
          type="radio"
          name="countries-options"
          id="countries-deaths"
        />
        <label htmlFor="countries-deaths" className="options__label">Deaths</label>
        <input
          className="options__input"
          value="totalRecovered"
          type="radio"
          name="countries-options"
          id="countries-recovered"
        />
        <label htmlFor="countries-recovered" className="options__label">Recovered</label>
      </div>
    );
  }
}

export default OptionsPanel;
