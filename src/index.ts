//@ts-ignore
import clarinet from 'clarinet';

type ParseEvent = { type: string; key?: string; value?: any; err?: Error };
export type JsonNode =
  | string
  | boolean
  | null
  | number
  | Map<string, JsonNode>
  | JsonNode[];

export function parse(input: string): JsonNode {
  const gen = processNode();
  let out: JsonNode | undefined = undefined;
  let err: Error | undefined = undefined;

  function dispatch(obj: ParseEvent) {
    try {
      const res = gen.next(obj);
      if (res.done) out = res.value as JsonNode;
    } catch (e) {
      err = e;
    }
  }

  const p = clarinet.parser();
  p.onopenobject = (key: string) => dispatch({ type: 'openobject', key });
  p.onopenarray = () => dispatch({ type: 'openarray' });
  p.onkey = (key: string) => dispatch({ type: 'key', key });
  p.onvalue = (value: string) => dispatch({ type: 'value', value });
  p.oncloseobject = () => dispatch({ type: 'closeobject' });
  p.onclosearray = () => dispatch({ type: 'closearray' });
  p.onerror = (err: Error) => dispatch({ type: 'error', err });
  //p.onend = () => dispatch({type:'end'});
  gen.next();

  p.write(input).close();
  if (err) throw err;
  return (out as unknown) as JsonNode;
}

export function stringify(obj: JsonNode): string {
  if (Array.isArray(obj)) return `[${obj.map(stringify).join(',')}]`;
  if (obj instanceof Map)
    return `{${[...obj]
      .map(([k, v]) => JSON.stringify(k) + ':' + stringify(v))
      .join(',')}}`;
  return JSON.stringify(obj);
}

const CLOSE_ARRAY = Symbol();

function* processNode(): Generator<
  any,
  JsonNode | typeof CLOSE_ARRAY,
  ParseEvent
> {
  const evt: ParseEvent = yield;
  switch (evt.type) {
    case 'value':
      return evt.value;
    case 'openobject':
      const obj: Map<string, JsonNode> = new Map();
      let key = evt.key;
      if (key===undefined) yield; // must be 'objectclose'
      while (key!==undefined) {
        obj.set(key, (yield* processNode()) as JsonNode);
        key = (yield).key; // 'key' or 'objectclose' event
      }
      return obj;
    case 'openarray':
      const arr: JsonNode[] = [];
      let el: JsonNode | typeof CLOSE_ARRAY;
      while (true) {
        el = yield* processNode();
        if (el === CLOSE_ARRAY) return arr;
        arr.push(el);
      }
    case 'closearray':
      return CLOSE_ARRAY;
    case 'error':
      throw evt.err;
    default:
      throw Error(`Unexpected ParseEvent ${evt.type}`);
  }
}
