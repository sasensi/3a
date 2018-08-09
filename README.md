# 3A
This repository is the source code of [trois-a.net](http://trois-a.net), a website made for an art gallery named 3A.  
Datas are directly pulled from gallery's [Facebook page](https://www.facebook.com/3Aruedeturin), using Facebook Graph API.

## Development

All commands must be run from root directory.  
Commands are defined for a Windows environment and should be adapted for other platforms.

### Install dependencies
- Back
```
docker run --rm --volume %cd%/root/admin:/app composer install
```
- Front
```
cd ./front
npm install
```

### Start servers
- Back  
To be able to debug with XDebug, `192.168.1.17` should be replaced by your machine IP.
```
docker run --rm -p 9002:80 ^
    -v %cd%/public:/var/www/html ^
    -e ENABLE_XDEBUG=1 ^
    -e XDEBUG_CONFIG=remote_host=192.168.1.17 ^
    --name 3a-server ^
    richarvey/nginx-php-fpm
```
- Front
```
cd ./front
npm run serve
```
Open [http://localhost:4200](http://localhost:4200) to view development app.


## Test

### Unit
```
cd ./front
npm run test
```

### End to end
```
cd ./front
npm run e2e:serve:front
npm run e2e:serve:back
```
#### Without debugging
```
cd ./front
npm run e2e:run
```

#### With debugging

- add `debugger;` somewhere in your test script
- run `npm run e2e:debug`
- open [chrome://inspect/#devices](chrome://inspect/#devices) in Chrome browser
- wait for target to appear click on `inspect`
- devtools should pause, press `F8`
- debugger should pause where you wanted to
- do debug
- close dev tools window


## Build
```
cd ./front
npm run build
```

Open [http://localhost:9002](http://localhost:9002) to view built app.
