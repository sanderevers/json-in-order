import { JsonNode, parse } from '../src';

describe('empty-object', () => {
  it('should return an empty Map', () => {
    const json = '{}';
    const m = parse(json) as Map<string, JsonNode>;
    expect(m.constructor).toEqual(Map);
    expect(m.size).toEqual(0);
  });
});
