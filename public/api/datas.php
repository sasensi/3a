<?php
/**
 * Created by PhpStorm.
 * User: sam
 * Date: 06/08/2018
 * Time: 17:13
 */

$result          = json_decode(file_get_contents(__DIR__.'/../admin/datas.json'), true);
$result['about'] = file_get_contents(__DIR__.'/about.html');

echo json_encode($result);