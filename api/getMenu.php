<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = '../data/menu.json';

if (file_exists($dataFile)) {
    $data = file_get_contents($dataFile);
    echo $data;
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Data bestand niet gevonden']);
}
?>
