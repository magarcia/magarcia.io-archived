import { range, paginate, basename, removeExtension } from './utils';

describe('range', () => {
  it('should generate an array with numbers', () => {
    expect(range(4)).toEqual([1, 2, 3, 4]);
  });
});

describe('paginate', () => {
  it('should return first page with default value', () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return first page with custom value', () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7], 2, 2)).toEqual([3, 4]);
  });
});

describe('basename', () => {
  it('should return the name of the file from the path', () => {
    expect(basename('../filename.js')).toEqual('filename.js');
  });
});

describe('removeExtension', () => {
  it('should remove the extension of the file', () => {
    expect(removeExtension('filename.js')).toEqual('filename');
  });

  it('should do nothing if the file has no extension', () => {
    expect(removeExtension('filename')).toEqual('filename');
  });
});
