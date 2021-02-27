import React from 'react';
import { connect } from 'react-redux';

import withDataService from '../hoc';
import { countryDeselected } from '../../actions';
import { compose } from '../../utils';

const ReturnToAll = ({ onClick }) => {
  return (
    <div
      className="content__to-all"
      onClick={onClick}
    >
      Return to all countries
    </div>
  );
};

export default ReturnToAll;
