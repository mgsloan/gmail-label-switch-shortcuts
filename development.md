# Running eslint

First, install eslint:

```
npm install eslint eslint-config-es5
```

Then, run `eslint.sh` to use it to do checking.

# Automated upload of extensions

This is probably only useful to me for uploading the extension, but I figured
I'd document it anyway incase someone wondered what's up with the
`Gruntfile.js`.  It is used to automate extension upload.

Install grunt and https://github.com/c301/grunt-webstore-upload via

```
npm install grunt grunt-webstore-upload
```

Then, populate `etc/secrets.json` with a json object with `chrome_client_id` and
`chrome_client_secret` fields. Finally, you can run `./make-and-upload.sh` to
make the zip and upload it!

Firefox is not yet automated, for now I just visit
https://addons.mozilla.org/en-US/developers/addon/gmail-label-switch-shortcuts/edit
