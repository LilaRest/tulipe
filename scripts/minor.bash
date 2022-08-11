#!/bin/bash
npm version --no-git-tag-version minor
npm run build
npm publish
git add -A
git commit
