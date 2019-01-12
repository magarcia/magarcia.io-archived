import { range } from './index';

describe('range', () => {
  it('should generate an array with numbers', () => {
    expect(range(4)).toEqual([1, 2, 3, 4]);
  });
});
