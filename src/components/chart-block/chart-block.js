/* eslint-disable class-methods-use-this */
import React, { Component, useEffect } from 'react';
import Chart from 'chart.js';

import { connect } from 'react-redux';

import withDataService from '../hoc';
import { globalDailyRequested,
        globalDailyLoaded,
        countryDailyRequested,
        countryDailyLoaded } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const SELECTED_CRITERIA = {
  totalConfirmed: 'dailyConfirmedIncrements',
  totalDeaths: 'dailyDeathsIncrements',
  totalRecovered: 'dailyRecoveredIncrements'
};

const CHART_TOOLTIPS = {
  dailyConfirmedIncrements: 'Daily Confirmed Rates',
  dailyRecoveredIncrements: 'Daily Recovered Rates',
  dailyDeathsIncrements: 'Daily Deaths Rates'
};
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const renderChart = (currentGraph, selectedCriteria = 'dailyConfirmedIncrements') => {
  if (!currentGraph[selectedCriteria]) return;
  const key = selectedCriteria;
  const tooltipTxt = CHART_TOOLTIPS[selectedCriteria] || 'Daily Confirmed Rates';
  const dates = [...currentGraph[key].keys()].map((x) => x.slice(0, 10));
  const values = [...currentGraph[key].values()];
  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: dates,
          datasets: [{
              label: key,
              data: values,
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)'
          }]
      },
      options: {
          legend: false,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback(value) {
                          return (value > 1000 ? `${`${value}`.slice(0, -3)}K` : value);
                      }
                  },
              }],
              xAxes: [{
                  gridLines: {
                      display: false,
                      offsetGridLines: false
                  },
                  ticks: {
                      maxTicksLimit: 6,
                      maxRotation: 0,
                      minRotation: 0,
                      callback(value) {
                          return MONTH_NAMES[parseInt(value.slice(0, 2), 10) - 1];
                      }
                  }
              }]

          },
          tooltips: {
              callbacks: {
                  label(tooltipItem) {
                      return `${tooltipTxt} ${tooltipItem.yLabel}`;
                  }
              }
          }
      }
  });
};

const ChartBlock = ({ dataService, globalDailyRequested, globalDailyLoaded, countryDailyRequested, countryDailyLoaded,
              loading, error, currentGraph, selectedCountry, selectedCriteria }) => {
  useEffect(() => {
    renderChart(currentGraph, SELECTED_CRITERIA[selectedCriteria]);
  }, [currentGraph, selectedCriteria]);

  useEffect(() => {
    if (!selectedCountry) {
      globalDailyRequested();
      dataService.getGlobalDaily()
        .then((data) => {
          globalDailyLoaded(data);
        });
    } else {
      countryDailyRequested();
      dataService.getCountryDaily(selectedCountry)
        .then((data) => {
          countryDailyLoaded(data);
        });
    }
  }, [selectedCountry]);

  if (loading) {
    return (
      <div className="content__chart">
        <h2 className="content__subtitle">Daily rates: <span className="content__country-name">Global</span></h2>
        <div className="content__chart-cont  chart-container">
          <canvas id="myChart" />
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorIndicator />;
  }

  const name = selectedCountry || "Global";

  return (
    <div className="content__chart">
      <h2 className="content__subtitle">Daily rates: <span className="content__country-name">{name}</span></h2>
      <br />
      <div className="content__chart-cont  chart-container">
        <canvas id="myChart" />
      </div>
    </div>
  );
};

const mapStateToProps = ({ currentGraph, loadingDaily, errorDaily, selectedCountry, selectedCriteria }) => ({
  currentGraph,
  loading: loadingDaily,
  error: errorDaily,
  selectedCountry,
  selectedCriteria
});

const mapDispatchToProps = {
  globalDailyRequested,
  globalDailyLoaded,
  countryDailyRequested,
  countryDailyLoaded,
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(ChartBlock);
