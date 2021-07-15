# json-in-order

Like `JSON.parse`, but preserving the key order from JSON objects; wherever `JSON.parse` produces a plain `object`, it produces a `Map`.

## Usage

```js
import {parse} from 'json-in-order';

const json = '{"2":"hearts","1":"soul"}';
const m = parse(json);

console.log(m.constructor.name)    // Map
console.log([...m].join(' / ') )   // 2,hearts / 1,soul
```

## Credits

Actual parsing is performed by [clarinet](https://github.com/dscape/clarinet).

Library built using [tsdx](https://tsdx.io).
