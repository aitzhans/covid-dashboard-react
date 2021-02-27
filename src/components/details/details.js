import React from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { countriesDataLoaded, countryDeselected, searchStarted } from '../../actions';
import { compose } from '../../utils';

const Details = ({ global }) => {
  const { totalConfirmed, totalRecovered, totalDeaths } = global;

  return (
    <div className="content__details">
      <h2 className="content__subtitle">Details: <span className="content__country-name">Global</span></h2>

      <p className="content__note">Click on toggles to see &apos;Total / Last update&apos; and &apos;Absolute / Per 100K&apos;</p>
      <div className="content__controls  toggle">
        <div className="toggle__btn  toggle__btn--period">
          <p className="toggle__txt  toggle__txt--period">Total period</p>
        </div>
        <div className="toggle__btn  toggle__btn--numbers">
          <p className="toggle__txt  toggle__txt--numbers">Absolute</p>
        </div>
      </div>
      <ul className="content__stats  stats">
        <li className="stats__item">
          <span className="stats__number  stats__number--cases">{totalConfirmed.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Cases</span>
        </li>
        <li className="stats__item">
          <span className="stats__number  stats__number--deaths">{totalDeaths.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Deaths</span>
        </li>
        <li className="stats__item">
          <span className="stats__number  stats__number--recovered">{totalRecovered.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Recovered</span>
        </li>
      </ul>
    </div>
  );
};

// export default Details;

const mapStateToProps = ({ loading, error, global, countries, selectedCountry, searchQuery }) => ({
  loading,
  error,
  global,
  // countries,
  // selectedCountry,
  // searchQuery
});

const mapDispatchToProps = {
  countriesDataLoaded,
  countryDeselected,
  searchStarted
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(Details);
