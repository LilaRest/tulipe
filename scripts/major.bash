#!/bin/bash
git pull --no-edit
npm version --no-git-tag-version major
git add -A
git commit
git push
