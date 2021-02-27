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
    // console.log(res);
    // console.log(new Date(res.updated).toLocaleString().slice(0, 10));
    // return {
    //   lastUpdated: new Date(),
    //   population: res.population,
    //   totalConfirmed: res.cases,
    //   totalRecovered: res.recovered,
    //   totalDeaths: res.deaths,
    //   newConfirmed: res.todayCases,
    //   newRecovered: res.todayDeaths,
    //   newDeaths: res.todayRecovered,
    // };
    return this._transformGlobal(res);
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
}
