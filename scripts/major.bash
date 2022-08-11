#!/bin/bash
npm version major
npm run build
npm publish
git add -A
git commit
