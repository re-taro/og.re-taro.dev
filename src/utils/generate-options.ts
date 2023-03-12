import capitalize from 'lodash-es/capitalize';

export const generateOptions = (options: Array<string>) =>
  options.map(item => ({
    value: item,
    label: capitalize(item),
  }));
