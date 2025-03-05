<?php
// CORS-Header setzen
header("Access-Control-Allow-Origin: *"); // Erlaubt Anfragen von überall (zum Testen)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Erlaubt POST- und OPTIONS-Anfragen
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With"); // Erlaubt Content-Type-Header
header("Access-Control-Allow-Credentials: true"); // Falls Cookies oder Authentifizierung genutzt werden


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Nur POST-Anfragen erlaubt"]);
    exit;
}


$json = file_get_contents('php://input');
error_log("📩 Anfrage erhalten: " . $json);

$params = json_decode($json);


if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Fehlende Daten"]);
    exit;
}

$email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
$message = nl2br(htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8'));


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Ungültige E-Mail-Adresse"]);
    exit;
}


error_log("Sende E-Mail an: $email - Name: $name - Nachricht: $message");

echo json_encode(["status" => "success", "message" => "Simulierter Mailversand erfolgreich"]);
