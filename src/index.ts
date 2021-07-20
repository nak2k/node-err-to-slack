import { request } from 'https';
import { URL } from 'url';

export function errToSlack(message?: string, suppression?: boolean) {
  const { env } = process;
  const url = env.SLACK_INCOMING_WEBHOOK_URL || env.SLACK_INCOMMING_WEBHOOK_URL;

  if (!url) {
    return (err: Error) => {
      if (!suppression) {
        throw err;
      }
    };
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
    req.on('error', (err: NodeJS.ErrnoException) => {
      console.log(`err-to-slack: (${err.code}) ${err.message}`);
    });
    req.end();

    if (!suppression) {
      throw err;
    }
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
