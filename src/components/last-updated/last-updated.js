import React, { Component } from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { globalDataLoaded } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class LastUpdated extends Component {
  componentDidMount() {
    const { dataService, globalDataLoaded } = this.props;
    dataService.getGlobalData()
      .then((data) => globalDataLoaded(data));
  }

  render() {
    const { lastUpdated, totalConfirmed, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <div>
        <p>
          Last updated: {lastUpdated}
        </p>
        <p>
          Global Cases: {totalConfirmed}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ global, loading, error }) => ({
  lastUpdated: global.lastUpdated,
  totalConfirmed: global.totalConfirmed,
  loading,
  error
});

const mapDispatchToProps = {
  globalDataLoaded,
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(LastUpdated);
