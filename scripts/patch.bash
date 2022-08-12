#!/bin/bash
npm version --no-git-tag-version patch
git add -A
git commit
git push
