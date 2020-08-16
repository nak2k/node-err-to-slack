const test = require('tape');
const { errToSlack } = require('..');

test('test errToSlack() without suppression', t => {
  t.plan(1);

  try {
    errToSlack('Test Error Message')(new Error('test'));
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test('test errToSlack() with suppression', t => {
  t.plan(1);

  try {
    errToSlack('Test Error Message', true)(new Error('test'));
    t.pass();
  } catch (err) {
    t.error(err);
  }
});
