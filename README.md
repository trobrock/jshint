# Hound JSCS

[JSCS] is a code style linter for programmatically enforcing your style guide.

`hound-jscs` is a Node service that polls `JavaScriptReviewJob`s from the
`java_script_review` queue, lints code with `JSCS`, then pushes the results to
the `high` queue, as `CompletedFileReviewJob`s.

[JSCS]: http://jscs.info/
