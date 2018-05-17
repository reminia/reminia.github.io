A github issue blog written with react and react-router.

Posts are hosted in github issues.

### start

`yarn start`

### build

`yarn build`

### dependencies

* react
* react-dom
* react-router-dom
* marked -> markdown parser, tried showdown first but it doesnt support code highight
* github-markdown-css -> markdown css
* highlight.js -> code block highlight

### configuration

Configuration is  under the config key of package.json. You can customize it. 
* user: github user name
* ga: google analysis GA ID

### usage
1. yarn build
2. push the build directory to the master branch of yourname.github.io repo 

### todo
1. ~~css mobile adapt~~
2. comment support
3. maybe pagination
4. link to weixin posts
5. add github auth

