#!/bin/bash
npm version patch
npm run build
npm publish
git add -A
git commit
