
const {parse,stringify} = require('./dist/tsc/index.js');

const json = '{"2":"hearts","1":"soul"}';
const m = parse(json);

console.log(m.constructor.name);   // Map
console.log([...m].join(' / '));   // 2,hearts / 1,soul
console.log([...m].map(([k,v])=>`${JSON.stringify(k)}:${v}`).join(','));

const j=stringify(m);
console.log(j);
