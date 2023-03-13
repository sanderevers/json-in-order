import { JsonNode, parse } from '../src';

describe('escaped-newline', () => {
  it('should produce a key with a newline', () => {
    const json = '{"a\\n":"b"}';
    const m = parse(json) as Map<string, JsonNode>;
    expect(m.constructor).toEqual(Map);
   expect([...m.keys()][0]).toEqual("a\n");
  });
});

