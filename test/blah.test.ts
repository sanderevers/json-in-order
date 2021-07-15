import { parse } from '../src';

describe('blah', () => {
  it('works', () => {
    const json = '{"2":"hearts","1":"soul"}';
    const m = parse(json);
    expect(m.constructor).toEqual(Map);
    expect([...m.keys()]).toEqual(["2","1"]);
  });
});
