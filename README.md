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
    -p 8080:80 ^
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

visit `http://localhost:4200`


## build
```
cd ./front
npm run build
```

visit `http://localhost:8080` to test before deployment
