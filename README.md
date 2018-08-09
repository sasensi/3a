# 3A


## development

### install dependencies
```
docker run --rm -it --volume %cd%/root/admin:/app composer install
cd ./front
npm install
```

### launch servers
```
docker run --rm -it ^
    -p 9002:80 ^
    -v %cd%/public:/var/www/html ^
    -e ENABLE_XDEBUG=1 ^
    -e XDEBUG_CONFIG=remote_host=192.168.1.17 ^
    --name 3a-server ^
    richarvey/nginx-php-fpm
```
```
cd ./front
npm run serve
```

open [http://localhost:4200](http://localhost:4200)


## test

### e2e
```
npm run test
npm run e2e
```

#### with debugging

- first add `debugger;` in test script
- make sure dev servers are running
- run `npm run e2e:debug`
- open [chrome://inspect/#devices](chrome://inspect/#devices)
- click on target
- devtools should pause, press `F8`
- debugger should pause where you wanted to
- do debug


## build
```
cd ./front
npm run build
```

visit `http://localhost:8080` to test before deployment
