#!/bin/bash
npm version --no-git-tag-version major
npm run build
npm publish
git add -A
git commit
