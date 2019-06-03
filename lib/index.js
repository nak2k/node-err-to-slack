const { request } = require('https');

const errToSlack = (message, next) => {
  const {
    SLACK_INCOMMING_WEBHOOK_URL: url,
  } = process.env;

  if (!url) {
    return next;
  }

  if (!next) {
    [next, message] = [message];
  }

  return (err, ...args) => {
    if (!err) {
      return next(err, ...args);
    }

    let options;

    options = new URL(url);

    const req = request(options, { method: 'POST' });

    const payload = makeSlackMessage(err, message);
    payload.channel = process.env.SLACK_CHANNEL;

    req.write(JSON.stringify(payload));
    req.end();

    return next(err, ...args);
  };
};

const makeSlackMessage = (err, message) => ({
  text: message || err.message,
  attachments: [{
    color: 'danger',
    text: err.stack,
  }],
});

exports.errToSlack = errToSlack;
