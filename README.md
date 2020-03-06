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

## Write events in different languages

- Create the posts, one for each language.
- In the metadata/yml of the posts make a field called ```lang-id``` and as value, write a uniq ID (can be letters, numbers or both)
- Give this to all the posts, all the same ID.
- Then give each event a language. ```Lang: value``` And of course the value is the language, like ```dk``` for danish and ```  gb``` for english and so on. To find a specific countries specific value visit [www.flag-icon-css.lip.is](http://flag-icon-css.lip.is/)
