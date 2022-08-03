#!/bin/sh

echo "Starting with the less compilation..."

./node_modules/less/bin/lessc --js --strict-imports ./src/theme/light.less ./public/styles/light.css

echo "FINISH!"
