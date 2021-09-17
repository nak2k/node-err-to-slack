const test = require('tape');
const { errToSlack } = require('..');

test('test errToSlack() without suppression', async t => {
  t.plan(1);

  try {
    const err = new Error('test');
    err.code = "TestCode";

    await errToSlack(err, {
      attachments: [
        {
          text: "Sample Attachment",
        },
      ],
    });
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test('test errToSlack() with suppression', async t => {
  t.plan(1);

  try {
    await errToSlack(new Error('test'), { suppression: true });
    t.pass();
  } catch (err) {
    t.error(err);
  }
});
