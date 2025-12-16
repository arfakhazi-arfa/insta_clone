<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include "../config/db.php";

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM posts WHERE user_id=? ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$posts = [];
while($row = $result->fetch_assoc()){
    $posts[] = $row;
}

echo json_encode($posts);
?>
