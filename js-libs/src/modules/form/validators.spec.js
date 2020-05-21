import * as validators from './validators';

describe('modules form utils - validators', () => {
  const val = 'VAl';
  const label = 'LABEl';
  const testError = (validator, v, message) => {
    expect(validator(v, label)).toEqual({ error: true, message });
  }
  const testSuccess = (validator, v) => {
    expect(validator(v, label)).toEqual({ error: false });
  }
  describe('empty', () => {
    const { empty } = validators;
    const message = validators.emptyMessage(label);
    it('returns success for non-empty strings', () => {
      testSuccess(empty, val);
    });
    it('returns an error if value is undefined', () => {
      testError(empty, undefined, message);
    });
    it('returns an error if value is an empty string', () => {
      testError(empty, '', message);
    });
  });
  describe('nameChars', () => {
    const { nameChars } = validators;
    const message = validators.nameCharsMessage(label);
    it('returns success for a valid string', () => {
      testSuccess(nameChars, 'a_valid_string');
    });
    it('returns an error if value has special characters other than _', () => {
      testError(nameChars, 'a space', message);
      testError(nameChars, 'a.period', message);
      testError(nameChars, 'a-dash', message);
      testError(nameChars, 'a#hash', message);
    });
  });

  describe('reduceErrors', () => {
    it('returns success if none of the messages passed are an error', () => {
      const errors = [{ error: false }, { error: false }, { error: false }];
      expect(validators.reduceErrors(errors)).toEqual({ error: false });
    });
    it('returns compiled error messages of all errors.', () => {
      const str1 = 'dangerous';
      const str2 = 'to';
      const str3 = 'go';
      const str4 = 'alone';
      const errors = [
        { error: false },
        { error: true, message: str1 },
        { error: false },
        { error: true, message: str2 },
        { error: false },
        { error: true, messages: [str3, str4] },
      ];
      expect(validators.reduceErrors(errors)).toEqual({
        error: true,
        messages: [str1, str2, str3, str4],
      });
    });
  });

  describe('name', () => {
    it('returns reduceErrors output for both empty and nameChars validators', () => {
      const expected = "EXPECTed!";
      const empty = 'empty';
      const nameChars = 'nameChars';
      validators.reduceErrors = jest.fn(() => expected);
      validators.empty = jest.fn(() => empty);
      validators.nameChars = jest.fn(() => nameChars);
      expect(validators.name(val, label)).toEqual(expected);
      expect(validators.reduceErrors).toHaveBeenCalledWith([empty, nameChars]);
      expect(validators.empty).toHaveBeenCalledWith(val, label);
      expect(validators.nameChars).toHaveBeenCalledWith(val, label);
    });
  });
});

