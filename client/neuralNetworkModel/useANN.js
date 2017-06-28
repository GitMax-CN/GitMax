const brain = require('brain');
const mimir = require('mimir');
const api = require('./api');
const networkJSON = require('./network.json');
const dictJSON = require('./dict.json');
const ANN_Classes = require('./categories.json');

let net = new brain.NeuralNetwork();
net.fromJSON(networkJSON);

const dict = dictJSON;

const classes_array = Object.keys(ANN_Classes);

const test_intro = 'Good afternoon, this is chen calling from Clevo';
const test_benefits = 'With this product, you can significantly reduce coaching prep time for your sales team';
const test_bow_intro = mimir.bow(test_intro, dict);
const test_bow_benefits = mimir.bow(test_benefits, dict);

console.log(net.run(test_bow_intro));
console.log(classes_array[api.maxarg(net.run(test_bow_intro))]);
console.log(net.run(test_bow_benefits));
console.log(classes_array[api.maxarg(net.run(test_bow_benefits))]);
