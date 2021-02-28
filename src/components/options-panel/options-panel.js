import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedCriteriaUpdated } from '../../actions';

class OptionsPanel extends Component {
  onChangeValue(event) {
    const selected = event.target;
    this.clearOptions();
    selected.classList.toggle('options__opt--selected');
    // console.log(selected.getAttribute('value'));
    this.props.selectedCriteriaUpdated(selected.getAttribute('value'));
  }

  // eslint-disable-next-line class-methods-use-this
  clearOptions() {
    const opts = document.querySelectorAll('.options__opt');
    opts.forEach((opt) => {
      opt.classList.remove('options__opt--selected');
    });
  }

  render() {
    return (
      <div className="content__options  options  options--countries" onClick={(e) => this.onChangeValue(e)}>
        <div
          className="options__opt"
          value="totalConfirmed"
        >
          Cases
        </div>
        <div
          className="options__opt"
          value="totalDeaths"
        >
          Deaths
        </div>
        <div
          className="options__opt"
          value="totalRecovered"
        >
          Recovered
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="content__options  options  options--countries" onChange={(e) => this.onChangeValue(e)}>
  //       <input
  //         className="options__input"
  //         value="totalConfirmed"
  //         type="radio"
  //         name="countries-options"
  //         id="countries-cases"
  //         defaultChecked
  //       />
  //       <label htmlFor="countries-cases" className="options__label">Cases</label>
  //       <input
  //         className="options__input"
  //         value="totalDeaths"
  //         type="radio"
  //         name="countries-options"
  //         id="countries-deaths"
  //       />
  //       <label htmlFor="countries-deaths" className="options__label">Deaths</label>
  //       <input
  //         className="options__input"
  //         value="totalRecovered"
  //         type="radio"
  //         name="countries-options"
  //         id="countries-recovered"
  //       />
  //       <label htmlFor="countries-recovered" className="options__label">Recovered</label>
  //     </div>
  //   );
  // }
}

// export default OptionsPanel;

const mapStateToProps = ({ selectedCriteria }) => ({
  selectedCriteria
});

const mapDispatchToProps = {
  selectedCriteriaUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
