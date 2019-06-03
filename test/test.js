const test = require('tape');
const { errToSlack } = require('..');

test('test errToSlack()', t => {
  t.plan(1);

  const fn = callback => callback(new Error('test'));

  fn(errToSlack('Test Error Message', err => {
    t.ok(err instanceof Error);
  }));
});

test('test errToSlack()', t => {
  t.plan(2);

  const fn = callback => callback(null, 1, 2, 3);

  fn(errToSlack('Test Error Message', (err, ...args) => {
    t.error(err);
    t.deepEquals(args, [1, 2, 3]);
  }));
});
