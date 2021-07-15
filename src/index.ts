//@ts-ignore
import clarinet from 'clarinet';

type ParseEvent = { type: string; key?: string; value?: any; err?: Error };

export function parse(input: string) {
  const gen = processNode();
  let out: any = undefined;
  let err: Error | undefined = undefined;

  function dispatch(obj: ParseEvent) {
    try {
      const res = gen.next(obj);
      if (res.done) out = res.value;
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
  return out;
}

const CLOSE_ARRAY = Symbol();

function* processNode(): Generator<any, any, ParseEvent> {
  const evt: ParseEvent = yield;
  switch (evt.type) {
    case 'value':
      return evt.value;
    case 'openobject':
      const obj: Map<string, any> = new Map();
      let key = evt.key;
      while (key) {
        obj.set(key, yield* processNode());
        key = (yield).key; // onkey or onobjectclose event
      }
      return obj;
    case 'openarray':
      const arr = [];
      let el: any;
      while (true) {
        el = yield* processNode();
        if (el === CLOSE_ARRAY) return arr;
        arr.push(el);
      }
    case 'closearray':
      return CLOSE_ARRAY;
    case 'error':
      throw evt.err;
  }
}
