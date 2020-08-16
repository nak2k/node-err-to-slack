import { request } from 'https';
import { URL } from 'url';

export function errToSlack(message?: string) {
  const {
    SLACK_INCOMMING_WEBHOOK_URL: url,
  } = process.env;

  if (!url) {
    return (err: Error) => { };
  }

  return (err: Error) => {
    if (!err) {
      return;
    }

    let options;

    options = new URL(url);

    const req = request(options, { method: 'POST' });

    const payload = makeSlackMessage(err, message);
    payload.channel = process.env.SLACK_CHANNEL;

    req.write(JSON.stringify(payload));
    req.end();
  };
}

function makeSlackMessage(err: Error, message?: string): {
  text: string;
  attachments: any[];
  channel?: string;
} {
  return {
    text: message || err.message,
    attachments: [{
      color: 'danger',
      text: err.stack,
    }],
  };
}
