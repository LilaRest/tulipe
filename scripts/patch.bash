#!/bin/bash
npm version --no-git-tag-version patch
npm run build
npm publish
git add -A
git commit
