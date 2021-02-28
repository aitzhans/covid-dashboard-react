import { INVALID_GEO_NAMES } from './consts';

export default class DeseaseService {
  _apiBase = 'https://disease.sh/v3/covid-19/';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }

    return await res.json();
  }

  getGlobalData = async () => {
    const res = await this.getResource(
      `all?yesterday=false&twoDaysAgo=0&allowNull=true`
    );
    return this._transformGlobal(res);
  };

  getCountriesData = async () => {
    const res = await this.getResource(
      `countries?yesterday=false&twoDaysAgo=false&allowNull=true`
    );
    return this._transformCountries(res);
  };

  getGlobalDaily = async () => {
    const res = await this.getResource(
      `historical/all?lastdays=all`
    );
    return this._transformDaily(res);
  }

  getCountryDaily = async (countryName) => {
    const res = await this.getResource(
      `historical/${countryName}?lastdays=all`
    );
    console.log(res);
    return this._transformDaily(res);
  }

  _transformGlobal = (res) => ({
    lastUpdated: new Date(res.updated).toLocaleString().slice(0, 10),
    population: res.population,
    totalConfirmed: res.cases,
    totalRecovered: res.recovered,
    totalDeaths: res.deaths,
    newConfirmed: res.todayCases,
    newRecovered: res.todayDeaths,
    newDeaths: res.todayRecovered,
  });

  _transformCountries = (res) => {
    const countries = [];
    res.forEach((country) => {
      if (!INVALID_GEO_NAMES.includes(country.country)) {
        countries.push({
          country: country.country || 0,
          population: country.population || 0,
          flagPath: country.countryInfo.flag,
          totalConfirmed: country.cases || 0,
          totalRecovered: country.recovered || 0,
          totalDeaths: country.deaths || 0,
          newConfirmed: country.todayCases || 0,
          newRecovered: country.todayRecovered || 0,
          newDeaths: country.todayDeaths || 0,
          lat: country.countryInfo.lat || 0,
          long: country.countryInfo.long || 0,
        });
      }
    });
    return countries;
  }

  _transformDaily = (res, country = null) => {
    const currentGraph = {
      dailyConfirmedIncrements: null,
      dailyDeathsIncrements: null,
      dailyRecoveredIncrements: null,
    };
    const dailyStats = country ? res.timeline : res;
    const dailyConfirmed = dailyStats.cases;
    const dailyDeaths = dailyStats.deaths;
    const dailyRecovered = dailyStats.recovered;
    currentGraph.dailyConfirmedIncrements = this._createIncrementsForGraphs(dailyConfirmed, 'dailyConfirmedIncrements');
    currentGraph.dailyDeathsIncrements = this._createIncrementsForGraphs(dailyDeaths, 'dailyDeathsIncrements');
    currentGraph.dailyRecoveredIncrements = this._createIncrementsForGraphs(dailyRecovered, 'dailyRecoveredIncrements');

    return currentGraph;
  }

  _createIncrementsForGraphs = (iniObj, absKey) => {
    const currentGraphAbs = new Map();
    let prevDateCases = 0;
    for (const [date, activeCases] of Object.entries(iniObj)) {
      const value = (activeCases - prevDateCases > 0) ? activeCases - prevDateCases : 0;
      currentGraphAbs.set(date, value);
      prevDateCases = activeCases;
    }
    return currentGraphAbs;
  }
}
