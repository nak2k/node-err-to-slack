import { request } from 'https';
import { parse } from 'url';

export const errToSlack = (message, next) => {
  const {
    SLACK_INCOMMING_WEBHOOK_URL: URL,
    SLACK_CHANNEL: CHANNEL,
  } = process.env;

  if (!URL) {
    return next;
  }

  if (!next) {
    [next, message] = [message];
  }

  const options = parse(URL);
  options.method = 'POST';

  return (err, ...args) => {
    if (!err) {
      return next(err, ...args);
    }

    const req = request(options);

    req.write(JSON.stringify({
      channel: CHANNEL,
      text: message,
      attachments: [{
        color: 'danger',
        text: err.stack,
      }],
    }));
    req.end();

    return next(err, ...args);
  };
};
