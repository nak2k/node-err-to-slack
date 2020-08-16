const test = require('tape');
const { errToSlack } = require('..');

test('test errToSlack()', t => {
  t.plan(1);

  errToSlack('Test Error Message')(new Error('test'));
  t.ok(true);
});
