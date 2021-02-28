import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { globalDataLoaded } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const LastUpdated = ({ dataService, globalDataLoaded, lastUpdated, totalConfirmed, loading, error }) => {
  useEffect(() => {
    dataService.getGlobalData()
      .then((data) => globalDataLoaded(data));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <div className="content__last-updated">
        <h3 className="content__subtitle  content__subtitle--mid">Last updated</h3>
        <p className="content__accent  content__accent--date">{lastUpdated}</p>
      </div>
      <div className="content__global">
        <h3 className="content__subtitle  content__subtitle--mid">Global cases</h3>
        <p className="content__accent  content__accent--total">{totalConfirmed.toLocaleString('de-DE')}</p>
      </div>
    </div>
  );
};

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
