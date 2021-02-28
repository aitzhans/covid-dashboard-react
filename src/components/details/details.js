import React, { Component } from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { countriesDataLoaded, countryDeselected, searchStarted } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      total: true,

    };
  }

  onPeriodToggle(e) {
    const toggle = e.target.parentNode;
    const toggleText = e.target;
    toggle.classList.toggle('toggle__btn--toggled');
    toggleText.innerText = (!this.state.total) ? 'Total period' : 'Last updated';
    this.setState(({ total }) => {
      return {
        total: !total
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderStats(confirmed, deaths, recovered) {
    return (
      <ul className="content__stats  stats">
        <li className="stats__item">
          <span className="stats__number  stats__number--cases">{confirmed.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Cases</span>
        </li>
        <li className="stats__item">
          <span className="stats__number  stats__number--deaths">{deaths.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Deaths</span>
        </li>
        <li className="stats__item">
          <span className="stats__number  stats__number--recovered">{recovered.toLocaleString('de-DE')}</span>
          <span className="stats__tag">Recovered</span>
        </li>
      </ul>
    );
  }

  render() {
    const { global, countries, selectedCountry, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    const { total } = this.state;
    let confirmed;
    let recovered;
    let deaths;
    if (total) {
      confirmed = 'totalConfirmed';
      recovered = 'totalRecovered';
      deaths = 'totalDeaths';
    } else {
      confirmed = 'newConfirmed';
      recovered = 'newRecovered';
      deaths = 'newDeaths';
    }

    const name = selectedCountry || "Global";
    let country;
    if (selectedCountry) {
      [country] = countries.filter((item) => item.country.toLowerCase() === selectedCountry.toLowerCase());
    }

    const stats = (selectedCountry)
            ? this.renderStats(country[confirmed], country[deaths], country[recovered])
            : this.renderStats(global[confirmed], global[deaths], global[recovered]);

    return (
      <div className="content__details">
        <h2 className="content__subtitle">Details: <span className="content__country-name">{name}</span></h2>

        <p className="content__note">Click on toggles to see &apos;Total / Last update&apos; </p>
        <div className="content__controls  toggle">
          <div className="toggle__btn  toggle__btn--period" onClick={(e) => this.onPeriodToggle(e)}>
            <p className="toggle__txt  toggle__txt--period">Total period</p>
          </div>
          {/* <div className="toggle__btn  toggle__btn--numbers">
            <p className="toggle__txt  toggle__txt--numbers">Absolute</p>
          </div> */}
        </div>
        {stats}
      </div>
    );
  }
}

const mapStateToProps = ({ loading, error, global, countries, selectedCountry }) => ({
  loading,
  error,
  global,
  countries,
  selectedCountry,

});

export default
  connect(mapStateToProps)(Details);
