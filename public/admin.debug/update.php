<?php
/**
 * created by Sam, the 04/07/2018 at 15:10
 *
 * Main update process.
 * Retrieve datas from facebook, filter and format them and store them in a file.
 *
 * model:
 * {
 *     images: [{
 *         url: string
 *         legend: string
 *     }, ...]
 *
 *     events: [{
 *         start: int
 *         end: int
 *         name: string
 *         description: string
 *         cover: string
 *         images: string[]
 *     }, ...]
 * }
 */

require_once __DIR__.'/../admin/vendor/autoload.php';

session_start();

const PAGE_ID         = '602240976801386';
const STATIC_ALBUM_ID = '670993456592804';

$fb = new \Facebook\Facebook([
	'app_id'                => '331324100778658',
	'app_secret'            => '4f54f2883086ccd38087c22f2eca5ae1',
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

try
{
	// get events
	$eventsResponse = $fb->get(PAGE_ID.'/events?fields=name,description,start_time,end_time,cover{source},event_times', $accessToken);
	$events         = $eventsResponse->getDecodedBody()['data'];

	// get albums
	$albumsResponse = $fb->get(PAGE_ID.'/albums?fields=name,photos{name,images{source}}', $accessToken);
	$albums         = $albumsResponse->getDecodedBody()['data'];
}
catch (Exception $e)
{
	echo <<<HTML
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Succès</title>
</head>
<body>
    <h1>Erreur</h1>
    <p>Vous ne disposez pas des droits d'accès nécessaires pour mettre à jour le site</p>
    <p>Token: {$accessToken->getValue()}</p>
    <p>Message d'erreur:</p>
    <pre>{$e->getMessage()}</pre>
    <p>Erreur brute:</p>
</body>
</html>
HTML;
	throw $e;
}


// store events by names to be able to check if album is event related
$eventsByName = [];
foreach ($events as $event)
{
	$eventsByName[ $event['name'] ] = $event;
}

// loop albums
$datas = [];
foreach ($albums as $album)
{
	// static album case
	if ($album['id'] === STATIC_ALBUM_ID)
	{
		$images = [];
		foreach ($album['photos']['data'] as $photo)
		{
			$url      = $photo['images'][0]['source'];
			$images[] = [
				'url'    => $photo['images'][0]['source'],
				'legend' => $photo['name'] ?? null,
			];
		}

		$datas['images'] = $images;
	}
	// event related case
	elseif (isset($eventsByName[ $album['name'] ]))
	{
		$images = [];
		foreach ($album['photos']['data'] as $photo)
		{
			$images[] = $photo['images'][0]['source'];
		}

		$eventsByName[ $album['name'] ]['images'] = $images;
	}
}

// format events datas
foreach ($eventsByName as $event)
{
	// multiple dates
	if (isset($event['event_times']))
	{
		$dates = [];
		foreach ($event['event_times'] as $eventTime)
		{
			$dates[] = [
				'start' => strtotime($eventTime['start_time']),
				'end'   => strtotime($eventTime['end_time']),
			];
		}

		// sort dates chronologically (facebook API sorting is anti-chronological)
		$dates = array_reverse($dates);
	}
	// single date
	else
	{
		$dates = [
			[
				'start' => strtotime($event['start_time']),
				'end'   => strtotime($event['end_time']),
			],
		];
	}

	$datas['events'][] = [
		'dates'       => $dates,
		'name'        => $event['name'],
		'description' => $event['description'],
		'cover'       => $event['cover']['source'],
		'images'      => $event['images'] ?? [],
	];
}

// encode datas
if (($encodedDatas = json_encode($datas)) === false)
{
	throw new Exception("L'encodage des données a échoué.");
}

echo <<<HTML
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Succès</title>
</head>
<body>
    <h1>Succès</h1>
    <p>Vous disposez des droits d'accès nécessaires pour mettre à jour le site</p>
    <p>Les données suivantes ont été collectées:</p>
    <pre>{$encodedDatas}</pre>
</body>
</html>
HTML;
