import { formatReadingTime, formatPostDate } from './helpers';

describe('formatReadingTime', () => {
  it('formats correctly', () => {
    expect(formatReadingTime(5)).toEqual('5 min read');
  });
});

describe('formatPostDate', () => {
  it('formats correctly', () => {
    expect(formatPostDate('2019-08-13')).toEqual('August 13, 2019');
  });
});
