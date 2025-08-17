<?php
header("Content-Type: application/json");

$path = "products.json";

// Eingehende JSON-Daten lesen
$input = json_decode(file_get_contents("php://input"), true);

// Validierung: Muss ein Array sein
if (!is_array($input)) {
  echo json_encode(["status" => "error", "message" => "Ungültige Daten"]);
  exit;
}

// Daten speichern
file_put_contents($path, json_encode($input, JSON_PRETTY_PRINT));

// Erfolgsmeldung
echo json_encode(["status" => "success"]);
