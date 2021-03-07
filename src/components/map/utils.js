const getDataRange = (data, levels) => {
  const tmp = data.sort((a, b) => a - b);
  const quantiles = [];
  const step = data.length / levels;
  for (let i = 1; i < levels; i += 1) {
    const qidx = Math.round(i * step + 0.49);
    quantiles.push(tmp[qidx - 1]);
  }
  const bounds = quantiles;

  bounds.unshift(tmp[0]);
  if (bounds[tmp.length - 1] !== tmp[tmp.length - 1]) bounds.push(tmp[tmp.length - 1]);

  const range = bounds;
  range.sort((a, b) => a - b);

  return range;
};

const classifyByRange = (num, range) => {
  if (num < range[0] || num > range[range.length - 1]) {
    throw new Error('Value out of range!');
  }

  let level;
  for (let i = 0; i < range.length; i += 1) {
    if (num === range[i]) {
      level = i;
      break;
    } else if (num >= range[i] && num < range[i + 1]) {
      level = i + 1;
      break;
    }
  }
  return level;
};

const getSpreadSpeedLevel = (currentCountry, countries, selectedCriteria) => {
  const totalSpreadLevels = 10;
  const currentValue = currentCountry[selectedCriteria];
  const allValues = countries.map((country) => country[selectedCriteria]);
  const dataRange = getDataRange(allValues, totalSpreadLevels);
  const ratio = classifyByRange(currentValue, dataRange);
  return ratio;
};

export default getSpreadSpeedLevel;
