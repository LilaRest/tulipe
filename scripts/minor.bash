#!/bin/bash
npm version minor
npm run build
npm publish
git add -A
git commit
