# 3A


## development

### install dependencies
```
docker run --rm -it --volume %cd%/root/admin:/app composer install
cd ./app
npm install
```

### launch servers
```
docker run --rm -it ^
    -p 8080:80 ^
    -v %cd%/root:/var/www/html ^
    -e ENABLE_XDEBUG=1 ^
    -e XDEBUG_CONFIG=remote_host=192.168.1.17 ^
    --name 3a-server ^
    richarvey/nginx-php-fpm
```
```
cd ./app
npm run serve
```


## build
```
cd ./app
npm run build
```