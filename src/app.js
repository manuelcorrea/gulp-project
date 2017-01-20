import utils from './utils';
import FooBar from './FooBar'

[1,2,3].map(n => n + 1);

console.log(utils.generateRandom()); //logs a random number
console.log(utils.sum(1, 2)); //3
console.log(utils.mark());

let foobar = new FooBar();
console.log(foobar.render());
