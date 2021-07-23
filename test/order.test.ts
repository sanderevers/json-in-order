import { parse, JsonNode } from '../src';

describe('order', () => {
  it('should create a Map with keys "2" and "1" in order', () => {
    const json = '{"2":"hearts","1":"soul"}';
    const m: Map<string, JsonNode> = parse(json) as Map<string, JsonNode>;
    expect(m.constructor).toEqual(Map);
    expect([...m.keys()]).toEqual(['2', '1']);
  });
});
