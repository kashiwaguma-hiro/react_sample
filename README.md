# react_sample

React.js study.

# Run and build Todo-App
1. up docker conainer
```bash
$ docker-compose up -d
```
2. enter container, and change directory
``` bash
$ docker exec -it reactsample_node_1 bash
```
3. build app and show on browser
```bash
$ npm start
```
```bash
url:http://localhost:3000
```
4. deploy to gh-pages
```bash
$ pwd
/usr/src/app/todo-app

$ npm run deploy
```
5. show in browser.
```bash
https://kashiwaguma-hiro.github.io/react_sample/
```


# Refs

### React
https://facebook.github.io/react/

### create-react-app
https://github.com/facebookincubator/create-react-app 
http://qiita.com/chibicode/items/8533dd72f1ebaeb4b614

### React datetime.
https://www.npmjs.com/package/react-datetime#contributions

### Deploy to gh-pages. 
https://blog.wadackel.me/2016/create-react-app/