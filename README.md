# err-to-slack

Post error to Slack.

## Installation

```
npm i err-to-slack -S
```

## Usage

``` javascript
import { errToSlack } from 'err-to-slack';

fs.readFile('test.txt', errToSlack('fs.readFile', (err, data) => {
  // Do something
}));
```

## Environment Variables

- `SLACK_INCOMMING_WEBHOOK_URL`
- `SLACK_CHANNEL`

## License

MIT
