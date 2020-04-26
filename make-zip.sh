#!/bin/sh -ex

# Ensure that eslint passes.
./eslint.sh

rm -f gmail-label-switch-shortcuts.zip
cd src
zip ../gmail-label-switch-shortcuts.zip *.js *.json *.png
cd ../
