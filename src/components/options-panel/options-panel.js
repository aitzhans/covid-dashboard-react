import React from 'react';
import { connect } from 'react-redux';
import { selectedCriteriaUpdated } from '../../actions';

const OptionsPanel = ({ selectedCriteriaUpdated }) => {
  const clearOptions = () => {
    const opts = document.querySelectorAll('.options__opt');
    opts.forEach((opt) => {
      opt.classList.remove('options__opt--selected');
    });
  };

  const onChangeValue = (event) => {
    const selected = event.target;
    clearOptions();
    selected.classList.toggle('options__opt--selected');
    selectedCriteriaUpdated(selected.getAttribute('value'));
  };

  return (
    <div className="content__options  options  options--countries" onClick={(e) => onChangeValue(e)}>
      <div
        className="options__opt  options__opt--selected"
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
};

const mapStateToProps = ({ selectedCriteria }) => ({
  selectedCriteria
});

const mapDispatchToProps = {
  selectedCriteriaUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
