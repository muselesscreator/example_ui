import defaultTo from './defaultTo';

describe('modules common utils - defaultTo', () => {
  const check = 'checK';
  const defaultValue = 'vlaue';
  const value = () => 'blargle-snarf';
  it('returns defaultValue if check value is undefined', () => {
    expect(defaultTo(undefined, defaultValue)).toEqual(defaultValue);
  });
  it('returns check if not undefined and no extra value passed', () => {
    expect(defaultTo(check, defaultValue)).toEqual(check);
  });
  it('returns the output of value fn if one is passed and checked in not undefined', () => {
    expect(defaultTo(check, defaultValue, value)).toEqual(value());
  });
});

