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

require_once __DIR__.'/vendor/autoload.php';

session_start();

const TOKEN           = 'EAAds54iOfxUBAMdNYg4IdhIC2TCZAjfpSzqBaeaS7gb61zuC0UDuuZBRj7AtbWP0Dxigtl6Iwi17nWMHoHIBOtF3ZAOS8t3dVDZCNOmySMZCnEfSXJ5ZCUFZAEamqcLNPbPZApc5Vb8GJpSQusnesrxVPbckMIMkq8q0fbesBI7XcgZDZD';
const PAGE_ID         = '2052061238441457';
const STATIC_ALBUM_ID = '2052072655106982';

$fb = new \Facebook\Facebook([
	'app_id'                => '2090066521259797',
	'app_secret'            => '340e01be925a120b566f3b513ab84eb5',
	'default_graph_version' => 'v3.1',
]);

// get events
$eventsResponse = $fb->get(PAGE_ID.'/events?fields=name,description,start_time,end_time,cover{source}', TOKEN);
$events         = $eventsResponse->getDecodedBody()['data'];

// get albums
$albumsResponse = $fb->get(PAGE_ID.'/albums?fields=name,photos{name,images{source}}', TOKEN);
$albums         = $albumsResponse->getDecodedBody()['data'];

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
	$datas['events'] = [
		'start'       => strtotime($event['start_time']),
		'end'         => strtotime($event['end_time']),
		'name'        => $event['name'],
		'description' => $event['description'],
		'cover'       => $event['cover']['source'],
		'images'      => $event['images'],
	];
}

// encode datas
if (($encodedDatas = json_encode($datas)) === false)
{
	throw new Exception("L'encodage des données a échoué.");
}

// write datas
if (file_put_contents(__DIR__.'/datas.json', $encodedDatas) === false)
{
	throw new Exception('La sauvegarde des données a échoué');
}

// show success message
echo 'Le site a bien été mis à jour.';