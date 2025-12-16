<?php
//  DEBUG 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//cores
header("Content-Type: application/json");


//  PREFLIGHT 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

//  DB
require_once("../config/db.php");

// ---------- READ JSON BODY (THIS WAS MISSING ❌) ----------
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid JSON data",
        "raw_input" => $rawInput
    ]);
    exit;
}

// ---------- EXTRACT DATA ----------
$username  = trim($data['username'] ?? '');
$full_name = trim($data['full_name'] ?? '');
$email     = trim($data['email'] ?? '');
$password  = $data['password'] ?? '';

// ---------- VALIDATION ----------
if (!$username || !$full_name || !$email || !$password) {
    echo json_encode([
        "status" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid email address"
    ]);
    exit;
}

// ---------- CHECK DUPLICATE EMAIL ----------
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "status" => false,
        "message" => "Email already registered"
    ]);
    exit;
}

// ---------- INSERT USER ----------
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (username, full_name, email, password)
     VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $username, $full_name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "status" => true,
        "message" => "User registered successfully"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Registration failed"
    ]);
}

// ---------- CLEANUP ----------
$stmt->close();
$conn->close();
