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
    });
    return countries;
  }
}
