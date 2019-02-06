# www.prolike.io

[![CircleCI](https://circleci.com/gh/prolike/prolike.io.svg?style=svg)](https://circleci.com/gh/prolike/prolike.io)

This is the source for [www.prolike,io](https://www.prolike.io)

It builds with Jekyll

```
.pli/dev-jekyll
```

The `gulpfile.js` updates dependencies (run `.dependencies`)

...the `circleci/confic.yml` file pretty much describes what is going on.


# Pure docker:
```
docker run \
  -it \
  --rm  \
  --pid=host \
  -v /$(pwd)://app:rw \
  --workdir //app  \
  --publish 80:4000 \
  lakruzz/jekyll-plus jekyll serve --config _config.yml,_dev_config.yml --watch
```
