[![(a histogram of downloads)](https://nodei.co/npm-dl/rules-fe2hpt.png?height=3)](https://npmjs.org/package/rules-fe2hpt)

This package (`rules-fe2hpt`) is a CLI tool that renames echomail area rules (prepared for FastEcho) so that they adhere to the HPT area rules filename format.

It requires [Node.js](http://nodejs.org/) to run and [npm](https://www.npmjs.org/) to be installed.

This package is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing rules-fe2hpt

[![(npm package version)](https://nodei.co/npm/rules-fe2hpt.png?downloads=true&downloadRank=true)](https://npmjs.org/package/rules-fe2hpt)

### Installing as a global application

* Latest packaged version: `npm install -g rules-fe2hpt`

* Latest githubbed version: `npm install -g https://github.com/Mithgol/rules-fe2hpt/tarball/master`

The application becomes installed globally and appears in the `PATH`. Then use `rules-fe2hpt` command to run the application.

### Installing as a portable application

Instead of the above, download the [ZIP-packed](https://github.com/Mithgol/rules-fe2hpt/archive/master.zip) source code of the application and unpack it to some directory. Then run `npm install --production` in that directory.

You may now move that directory (for example, on a flash drive) across systems as long as they have the required version of Node.js installed.

Unlike the above (`npm -g`), the application does not appear in the `PATH`, and thus you'll have to run it directly from the application's directory. You'll also have to run `node rules-fe2hpt [parameters]` instead of `rules-fe2hpt [parameters]`.

## Running rules-fe2hpt

Run rules-fe2hpt in the directory that contains FastEcho-prepared rules; they'll be renamed using HPT-compliant format.

You may add the parameter `--rus` for rules-fe2hpt to display Russian messages instead of English.

## Testing rules-fe2hpt

[![(build testing status)](https://img.shields.io/travis/Mithgol/rules-fe2hpt/master.svg?style=plastic)](https://travis-ci.org/Mithgol/rules-fe2hpt)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of rules-fe2hpt).

After that you may run `npm test` (in the directory of rules-fe2hpt). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
