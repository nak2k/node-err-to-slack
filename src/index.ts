import { request } from 'https';
import { URL } from 'url';
import type { MessageAttachment } from "@slack/types";

interface Payload {
  channel?: string;
  text?: string;
  attachments?: MessageAttachment[];
}

export interface ErrToSlackOptions {
  channel?: string;
  text?: string;
  attachments?: MessageAttachment[];
  suppression?: boolean;
}

export async function errToSlack(err: any, options: ErrToSlackOptions = {}) {
  if (!err) {
    return;
  }

  if (typeof err !== 'object') {
    err = { message: String(err) };
  }

  const url = process.env.SLACK_INCOMING_WEBHOOK_URL;

  if (!url) {
    if (!options.suppression) {
      throw err;
    }

    return;
  }

  const fields: MessageAttachment["fields"] = [];

  if (options.text && err.message) {
    fields.push({
      title: "message",
      value: err.message,
    });
  }

  if (err.code) {
    fields.push({
      title: "code",
      value: err.code,
      short: true,
    });
  }

  if (err.name) {
    fields.push({
      title: "name",
      value: err.name,
      short: true,
    });
  }

  if (err.statusCode) {
    fields.push({
      title: "statusCode",
      value: String(err.statusCode),
      short: true,
    });
  }

  if (err.time) {
    fields.push({
      title: "time",
      value: String(err.time),
      short: true,
    });
  }

  if (err.requestId) {
    fields.push({
      title: "requestId",
      value: err.requestId,
    });
  }

  const payload: Payload = {
    channel: options.channel || process.env.SLACK_CHANNEL,
    text: options.text || err.message,
    attachments: [
      ...(options.attachments || []),
      {
        color: 'danger',
        text: err.stack,
        fields,
      },
    ],
  };

  return new Promise<void>((resolve, reject) => {
    const done = options.suppression ? resolve : () => reject(err);

    const req = request(new URL(url), { method: 'POST' }, res => {
      if (res.statusCode !== 200) {
        console.error(`err-to-slack: Error response (${res.statusCode}) ${res.statusMessage}`);
      }
      done();
    });

    req.on('error', (err: NodeJS.ErrnoException) => {
      console.error(`err-to-slack: (${err.code}) ${err.message}`);
      done();
    });

    req.end(JSON.stringify(payload));
  });
}
