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

const test_history = 'The beginning of the Viking Age in the British Isles is, however, often given as 793.';
const test_music = 'Baroque music is a style of Western art music composed from approximately 1600 to 1750';
const test_bow_history = mimir.bow(test_history, dict);
const test_bow_music = mimir.bow(test_music, dict);

let predict = net.run(test_bow_history);
console.log(predict);
console.log(classes_array[api.maxarg(predict)]);
console.log(classes_array[api.maxarg(net.run(test_bow_music))]);