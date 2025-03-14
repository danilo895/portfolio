<?php
// CORS-Header setzen
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With"); 
header("Access-Control-Allow-Credentials: true");

// OPTIONS-Request für CORS behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nur POST-Anfragen zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Nur POST-Anfragen erlaubt"]);
    exit;
}

// Daten einlesen
$json = file_get_contents('php://input');
$params = json_decode($json);

// Prüfen, ob alle Felder vorhanden sind
if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Fehlende Daten"]);
    exit;
}

// Daten validieren und bereinigen
$email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
$message = nl2br(htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8'));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Ungültige E-Mail-Adresse"]);
    exit;
}

// Empfänger-Adresse (deine eigene E-Mail!)
$to = "loefflerdaniel@web.de";
$subject = "Neue Kontaktanfrage von $name";

// E-Mail-Header setzen
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// E-Mail-Body erstellen
$body = "
    <html>
    <head>
        <title>Kontaktformular Anfrage</title>
    </head>
    <body>
        <h2>Neue Nachricht von deiner Website</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>E-Mail:</strong> $email</p>
        <p><strong>Nachricht:</strong></p>
        <p>$message</p>
    </body>
    </html>
";

// E-Mail senden
$mail_sent = mail($to, $subject, $body, $headers);

if ($mail_sent) {
    echo json_encode(["status" => "success", "message" => "E-Mail erfolgreich gesendet"]);
} else {
    echo json_encode(["status" => "error", "message" => "E-Mail-Versand fehlgeschlagen"]);
}
?>
