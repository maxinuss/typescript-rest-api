import { DecimalTransformer } from '../../../src/common/DecimalTransformer';

describe('DecimalTransformer', () => {
  let decimalTransformer: DecimalTransformer;

  beforeEach(() => {
    decimalTransformer = new DecimalTransformer();
  });

  describe('to', () => {
    it('should return the input value as is', () => {
      const inputValue = 42;
      const result = decimalTransformer.to(inputValue);
      expect(result).toBe(inputValue);
    });
  });

  describe('from', () => {
    it('should convert string to number', () => {
      const inputValue = '42';
      const result = decimalTransformer.from(inputValue);
      expect(result).toBe(+inputValue);
    });

    it('should handle non-numeric string gracefully', () => {
      const nonNumericValue = 'abc';
      const result = decimalTransformer.from(nonNumericValue);
      expect(result).toBeNaN();
    });
  });
});
