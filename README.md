# Hound JSHint

[JSHint] is a static code analysis tool for JavaScript

`hound-jshint` is a Node service that polls `JsHintReviewJob`s from the
`jshint_review` queue, lints code with `JSHint`, then pushes the results to
the `high` queue, as `CompletedFileReviewJob`s.

[JSHint]: http://jshint.com/

## Testing locally

First, add the following to the bottom of `index.js`:

```js
var testQueue = require("./lib/test-queue");

testQueue(redis);
```

Next, start the Resque web interface:

```bash
$ cd node_modules/node-resque/resque-web
$ bundle install
$ bundle exec rackup
$ open http://localhost:9292
```

As you run the worker, monitor how jobs flow through the queues.
