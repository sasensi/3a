<?php
/**
 * created by Sam, the 04/07/2018 at 15:10
 */

require_once __DIR__.'/vendor/autoload.php';

session_start();

$fb = new \Facebook\Facebook([
	'app_id'                => '2090066521259797',
	'app_secret'            => '340e01be925a120b566f3b513ab84eb5',
	'default_graph_version' => 'v3.1',
]);

$helper = $fb->getJavaScriptHelper();

try
{
	$accessToken = $helper->getAccessToken();
}
catch (Facebook\Exceptions\FacebookResponseException $e)
{
	// When Graph returns an error
	echo 'Graph returned an error: '.$e->getMessage();
	exit;
}
catch (Facebook\Exceptions\FacebookSDKException $e)
{
	// When validation fails or other local issues
	echo 'Facebook SDK returned an error: '.$e->getMessage();
	exit;
}

if (!isset($accessToken))
{
	echo 'No cookie set or no OAuth data could be obtained from cookie.';
	exit;
}

// Logged in
echo '<h3>Access Token</h3>';
var_dump($accessToken->getValue());