# json-in-order

Like `JSON.parse`, but preserving the key order from JSON objects; wherever `JSON.parse` produces a plain `object`, it produces a `Map`.

## Usage

```js
import {parse} from 'json-in-order';

const json = '{"2":"hearts","1":"soul"}';
const m = parse(json);

console.log(m.constructor.name);   // Map
console.log([...m].join(' / '));   // 2,hearts / 1,soul
```

## Motivation

Since ES2015, JavaScript `object` keys have a well-defined order for iteration. This is _almost_ the order in which
they were inserted, [but not quite](https://stackoverflow.com/a/5525820). In particular, the keys `"2"` and
`"1"` from the above example are returned in a different order if you put them in an `object`:

```js
const obj = {"2":"hearts"};
obj["1"]="soul";
console.log(Object.entries(obj).join(' / '));  // 1,soul / 2,hearts
```

So, if you're parsing JSON and are interested in the order in which the keys appear in the input string, you cannot use
`JSON.parse`, because it will always construct an `object`. In which, by the way, it is totally justified, because
[objects have no defined order](https://www.json.org/json-en.html) in the JSON spec.

Still, object keys do have an order in the JSON string, and who is Douglas Crockford to say that you must ignore it?
Also since ES2015, JavaScript has a standard [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
datatype whose iteration order follows the exact insertion order. Therefore, this package parses JSON objects as a `Map` instead
of an `object`. Use it as you see fit.

## Credits

Actual parsing is performed by [clarinet](https://github.com/dscape/clarinet).
