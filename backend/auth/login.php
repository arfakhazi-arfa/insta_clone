<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require("../config/db.php");

// ✅ Read JSON body correctly
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid JSON data"
    ]);
    exit;
}

$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode([
        "status" => false,
        "message" => "Email and password are required"
    ]);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid email address"
    ]);
    exit;
}

// Check user exists
$stmt = $conn->prepare(
    "SELECT id, username, full_name, email, password 
     FROM users 
     WHERE email = ?"
);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => false,
        "message" => "User not found"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid password"
    ]);
    exit;
}

// Remove password before sending response
unset($user['password']);

echo json_encode([
    "status" => true,
    "message" => "Login successful",
    "user" => $user
]);

$stmt->close();
$conn->close();
