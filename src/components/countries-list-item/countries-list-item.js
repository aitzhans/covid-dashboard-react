import React from 'react';
import { connect } from 'react-redux';

import { countrySelected } from '../../actions';

const CountriesListItem = ({ cases, name, flagPath, countrySelected }) => {
  return (
    <div className="countries__item" onClick={() => countrySelected(name)}>
      <span className="countries__number">
        {cases ? cases.toLocaleString('de-DE') : cases}
      </span>
      <span className="countries__name">{name}</span>
      <div className="countries__flag">
        <img src={flagPath} alt="flag" />
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectedCountry }) => ({
  selectedCountry
});

const mapDispatchToProps = {
  countrySelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesListItem);
