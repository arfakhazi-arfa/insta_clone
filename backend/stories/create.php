<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

include "../config/db.php";

$user_id = $_POST['user_id'];
$image = $_FILES['image']['name'];
$tmp_name = $_FILES['image']['tmp_name'];
$expires_at = date('Y-m-d H:i:s', strtotime('+24 hours'));

$upload_path = "../uploads/stories/".$image;
move_uploaded_file($tmp_name, $upload_path);

$sql = "INSERT INTO stories (user_id, image, expires_at) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $user_id, $image, $expires_at);

if($stmt->execute()){
    echo json_encode(["status" => "success", "message" => "Story created"]);
}else{
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
