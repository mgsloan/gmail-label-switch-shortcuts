#!/bin/sh -ex

# Ensure that eslint passes.
./eslint.sh
# Ensure that addons-linter passes
addons-linter src/

rm -f gmail-label-switch-shortcuts.zip
cd src
zip ../gmail-label-switch-shortcuts.zip *
cd ../
