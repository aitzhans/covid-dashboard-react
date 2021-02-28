import React, { Component } from 'react';
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import LastUpdated from '../last-updated';
import Details from '../details';
import Map from '../map';
import Footer from '../footer';
import ChartBlock from '../chart-block';

import '../../scss/style.scss';

import CountriesList from '../countries-list';

const App = () => (
  <ErrorBoundry>
    <Header />
    <main className="content">
      <div className="content__left">
        <LastUpdated />
        <CountriesList />
      </div>
      <div className="content__center">
        <Map />
      </div>
      <div className="content__right">
        <Details />
        <ChartBlock />
      </div>
    </main>
    <Footer />
  </ErrorBoundry>
);

export default App;
