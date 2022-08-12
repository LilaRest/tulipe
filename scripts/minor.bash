#!/bin/bash
npm version --no-git-tag-version minor
git add -A
git commit
git push
