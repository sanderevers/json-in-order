import { JsonNode, parse } from '../src';

describe('empty-string-as-key', () => {
    it(`should return a Map with one entry`, () => {
      const json = '{"":42}';
      const m = parse(json) as Map<string, JsonNode>;
      expect(m.constructor).toEqual(Map);
      expect([...m.keys()]).toEqual(['']);
    });
});
