<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check admin sessie
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Niet geautoriseerd']);
    exit;
}

// Use absolute path for security
$dataFile = dirname(__DIR__) . '/data/menu.json';

// Lees huidige data
if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Data bestand niet gevonden']);
    exit;
}

// Ontvang nieuwe data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Ongeldige data']);
    exit;
}

// Validate data structure
if (!isset($input['menu']) || !is_array($input['menu'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Menu data ontbreekt of is ongeldig']);
    exit;
}

if (!isset($input['openingsuren']) || !is_array($input['openingsuren'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Openingsuren data ontbreekt of is ongeldig']);
    exit;
}

// Additional validation: check menu structure
foreach ($input['menu'] as $category) {
    if (!isset($category['title']) || !isset($category['items']) || !is_array($category['items'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Ongeldige menu categorie structuur']);
        exit;
    }
}

// Schrijf nieuwe data naar bestand
$jsonData = json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$success = file_put_contents($dataFile, $jsonData);

if ($success !== false) {
    echo json_encode(['success' => true, 'message' => 'Data opgeslagen']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Kon data niet opslaan. Check bestandsrechten.']);
}
?>
