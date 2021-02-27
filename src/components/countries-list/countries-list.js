import React, { Component } from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { countriesDataLoaded, countryDeselected, searchStarted } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import CountriesListItem from '../countries-list-item';
import SearchPanel from '../search-panel';
import OptionsPanel from '../options-panel';
import ReturnToAll from '../return-to-all';

class CountriesList extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      filter: 'totalConfirmed' // totalDeaths, totalConfirmed, totalRecovered
    };
  }

  componentDidMount() {
    const { dataService, countriesDataLoaded } = this.props;
    dataService.getCountriesData()
      .then((data) => countriesDataLoaded(data));
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onSearchChange = (term) => {
    // this.setState({ term });
    this.props.searchStarted(term);
  }

  onCountrySelect = (countryName) => {
    this.setState({ selectedCountry: countryName });
  }

  // eslint-disable-next-line class-methods-use-this
  search(items, term) {
    if (!term) {
      return items;
    }

    return items.filter((item) => {
      return item.country
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    });
  }

  renderElements(countries, filter, selectedCountry, term) {
    // const { term } = this.state;

    let visibleItems;
    if (selectedCountry) {
      visibleItems = countries.filter((item) => item.country.toLowerCase() === selectedCountry.toLowerCase());
    } else {
      const numbersSort = (a, b) => b - a;
      countries.sort((a, b) => numbersSort(a[filter], b[filter]));
      visibleItems = this.search(countries, term);
    }

    // const numbersSort = (a, b) => b - a;
    // countries.sort((a, b) => numbersSort(a[filter], b[filter]));
    // const visibleItems = this.search(countries, term);

    return visibleItems.map((item) => {
      const { country, flagPath } = item;
      const filterCriteria = item[filter];
      return (
        // <li key={country} className="countries__item" onClick={() => this.onCountrySelect(country)}>
        <li key={country}>
          <CountriesListItem cases={filterCriteria} name={country} flagPath={flagPath} />
        </li>
      );
    });
  }

  render() {
    const { loading, error, countries, selectedCountry, searchQuery, countryDeselected } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    const elements = this.renderElements(countries, this.state.filter, selectedCountry, searchQuery);

    return (
      <div>
        <div className="content__countries">
          <div className="content__subtitle-container">
            <h3 className="content__subtitle  content__subtitle--sm">Cases by Country/Region/Sovereignty</h3>
          </div>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ReturnToAll onClick={countryDeselected} />
          <OptionsPanel onFilterChange={this.onFilterChange} />
          <div className="countries__container">
            <ul className="content__countries-list  countries">
              {elements}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, error, countries, selectedCountry, searchQuery }) => ({
  loading,
  error,
  countries,
  selectedCountry,
  searchQuery
});

const mapDispatchToProps = {
  countriesDataLoaded,
  countryDeselected,
  searchStarted
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(CountriesList);
