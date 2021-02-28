/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js';

import { connect } from 'react-redux';
import OptionsPanel from '../options-panel';

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

class ChartBlock extends Component {
  componentDidMount() {
    const { dataService, globalDailyLoaded } = this.props;
    dataService.getGlobalDaily()
      .then((data) => {
        globalDailyLoaded(data);
        // this.renderChart(currentGraph);
      });
  }

  componentDidUpdate() {
    this.render();
  }

  updateDailyData(selectedCountry) {
    const { dataService, countryDailyRequested, countryDailyLoaded } = this.props;
    countryDailyRequested();
    // dataService.getCountryDaily(selectedCountry)
    //   .then((data) => {
    //     countryDailyLoaded(data);
    //     // this.renderChart(currentGraph);
    //   });
  }

  // eslint-disable-next-line class-methods-use-this
  renderChart(currentGraph, selectedCriteria = 'dailyConfirmedIncrements') {
      const key = selectedCriteria;
      const tooltipTxt = CHART_TOOLTIPS[selectedCriteria] || 'Daily Confirmed Rates';
      // console.log(currentGraph);
      const dates = [...currentGraph[key].keys()].map((x) => x.slice(0, 10));
      const values = [...currentGraph[key].values()];
      // console.log(dates);
      // console.log(values);
      // if (this.chart) { this.chart.destroy(); }
      const ctx = document.getElementById('myChart').getContext('2d');

      this.chart = new Chart(ctx, {
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
  }

  render() {
    const { loading, error } = this.props;
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

    const { currentGraph, selectedCountry, selectedCriteria } = this.props;
    const name = selectedCountry || "Global";
    const chart = this.renderChart(currentGraph, SELECTED_CRITERIA[selectedCriteria]);
    // console.log(selectedCountry);
    // console.log(selectedCriteria);
    // if (selectedCountry) {
    //   this.updateDailyData(selectedCountry);
    // }

    return (
      <div className="content__chart">
        <h2 className="content__subtitle">Daily rates: <span className="content__country-name">{name}</span></h2>
        <br />
        <div className="content__chart-cont  chart-container">
          <canvas id="myChart" />
          {/* {setTimeout((() => this.renderChart(currentGraph, SELECTED_CRITERIA[selectedCriteria])), 10)} */}
          {/* { this.renderChart(currentGraph, SELECTED_CRITERIA[selectedCriteria])} */}
          { chart }
        </div>
      </div>

    );
  }
}

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
