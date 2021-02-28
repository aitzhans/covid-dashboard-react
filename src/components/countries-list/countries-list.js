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
  componentDidMount() {
    const { dataService, countriesDataLoaded } = this.props;
    dataService.getCountriesData()
      .then((data) => countriesDataLoaded(data));
  }

  onSearchChange = (term) => {
    // this.setState({ term });
    this.props.searchStarted(term);
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
    let visibleItems;
    if (selectedCountry) {
      visibleItems = countries.filter((item) => item.country.toLowerCase() === selectedCountry.toLowerCase());
    } else {
      const numbersSort = (a, b) => b - a;
      countries.sort((a, b) => numbersSort(a[filter], b[filter]));
      visibleItems = this.search(countries, term);
    }

    return visibleItems.map((item) => {
      const { country, flagPath } = item;
      const filterCriteria = item[filter];
      return (
        <li key={country}>
          <CountriesListItem cases={filterCriteria} name={country} flagPath={flagPath} />
        </li>
      );
    });
  }

  render() {
    const { loading, error, countries, selectedCountry,
            searchQuery, countryDeselected, selectedCriteria } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    const elements = this.renderElements(countries, selectedCriteria, selectedCountry, searchQuery);

    return (
      <div>
        <div className="content__countries">
          <div className="content__subtitle-container">
            <h3 className="content__subtitle  content__subtitle--sm">Cases by Country/Region/Sovereignty</h3>
          </div>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ReturnToAll onClick={countryDeselected} />
          <OptionsPanel />
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

const mapStateToProps = ({ loadingCountries, errorCountries, countries, selectedCountry, searchQuery, selectedCriteria }) => ({
  loading: loadingCountries,
  error: errorCountries,
  countries,
  selectedCountry,
  searchQuery,
  selectedCriteria
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
