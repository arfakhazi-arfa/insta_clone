<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

include "../config/db.php";

$user_id = $_POST['user_id'];
$caption = $_POST['caption'];
$image = $_FILES['image']['name'];
$tmp_name = $_FILES['image']['tmp_name'];

$upload_path = "../uploads/posts/".$image;
move_uploaded_file($tmp_name, $upload_path);

$sql = "INSERT INTO posts (user_id, image, caption) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $user_id, $image, $caption);

if($stmt->execute()){
    echo json_encode(["status" => "success", "message" => "Post created"]);
}else{
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
