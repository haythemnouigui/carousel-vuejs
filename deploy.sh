#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'new deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:haythemnouigui/haythemnouigui.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:haythemnouigui/carousel-vuejs.git master:gh-pages

cd -