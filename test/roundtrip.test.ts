import { parse, stringify } from '../src';

describe('roundtrip', () => {
  it('should stringify then parse', () => {
    const obj = new Map<string, any>();
    obj.set('2', 'Hello');
    obj.set('1', [true, 'world']);
    const json = stringify(obj);
    const ret = parse(json);
    expect(ret).toEqual(obj);
  });
});
