#!/bin/bash
git pull --no-edit
npm version --no-git-tag-version patch
git add -A
git commit
git push
