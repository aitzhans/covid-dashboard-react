import React, { Component } from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { countriesDataLoaded } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import CountriesListItem from '../countries-list-item';
import SearchPanel from '../search-panel';

class CountriesList extends Component {
  constructor() {
    super();
    this.state = {
      term: ''
    };
  }

  componentDidMount() {
    const { dataService, countriesDataLoaded } = this.props;
    dataService.getCountriesData()
      .then((data) => countriesDataLoaded(data));
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  // eslint-disable-next-line class-methods-use-this
  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.country
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {
    const { loading, error, countries } = this.props;
    const { term } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    const numbersSort = (a, b) => b - a;
    countries.sort((a, b) => numbersSort(a.totalConfirmed, b.totalConfirmed));

    const visibleItems = this.search(countries, term);

    const elements = visibleItems.map((item) => {
      const { country, totalConfirmed, flagPath } = item;

      return (
        <li key={country} className="countries__item">
          <CountriesListItem cases={totalConfirmed} name={country} flagPath={flagPath} />
        </li>
      );
    });

    return (
      <div>
        <div className="content__countries">
          <div className="content__subtitle-container">
            <h3 className="content__subtitle  content__subtitle--sm">Cases by Country/Region/Sovereignty</h3>
          </div>
          <SearchPanel onSearchChange={this.onSearchChange} />

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

const mapStateToProps = ({ loading, error, countries }) => ({
  loading,
  error,
  countries
});

const mapDispatchToProps = {
  countriesDataLoaded,
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(CountriesList);
