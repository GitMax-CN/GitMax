'use strict';
const redisConfig = require('../config').redis;

let redis = require('redis');
let client = redis.createClient(redisConfig.port, redisConfig.host, {no_ready_check: true});
client.auth(redisConfig.pwd, function (err) {
  if (err) throw err;
});

client.on('connect', function() {
  console.log('Connected to Redis');
  client.set("foo", "bar", redis.print);
  client.get("foo", function (err, reply) {
    if (err) throw err;
    console.log(reply.toString());
  });
});
