# err-to-slack

Post error to Slack.

## Installation

```
npm i err-to-slack
```

## Usage

``` javascript
const { errToSlack } = require('err-to-slack');

fs.readFile('test.txt', errToSlack('fs.readFile', (err, data) => {
  // Do something
}));
```

## Environment Variables

- `SLACK_INCOMMING_WEBHOOK_URL`
- `SLACK_CHANNEL`

## License

MIT
