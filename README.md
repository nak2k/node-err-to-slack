# err-to-slack

Post errors to Slack.

## Installation

```
npm i err-to-slack
```

## Usage

``` typescript
import { errToSlack } from 'err-to-slack';

const data = await fs.promises.readFile('test.txt')
  .catch(errToSlack)
  .catch((err: Error) => {
    // Additional error handling.
  });
```

## Environment Variables

- `SLACK_INCOMING_WEBHOOK_URL`
- `SLACK_CHANNEL`

## License

MIT
