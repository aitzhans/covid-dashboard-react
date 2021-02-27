import React, { Component } from 'react';
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import LastUpdated from '../last-updated';
import './app.scss';

import DeseaseService from '../../services';

// const App = () => (
//   <ErrorBoundry>
//     <Header />
//     <p>Hello world!</p>
//   </ErrorBoundry>
// );

// export default App;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.service = new DeseaseService();
    this.state = {
      lastUpdated: null,
      population: null,
      totalConfirmed: null,
      totalRecovered: null,
      totalDeaths: null,
      newConfirmed: null,
      newRecovered: null,
      newDeaths: null,
    };
    this.updateGlobal();
  }

  updateGlobal() {
    this.service.getGlobalData().then((value) => {
      this.setState(value);
    });
  }

  render() {
    // const data = service.getGlobalData();
    // console.log(data);

    return (
      <ErrorBoundry>
        <Header />
        <LastUpdated />
      </ErrorBoundry>
    );
  }
}
