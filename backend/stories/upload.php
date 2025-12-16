<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

/*
  Expected:
  - POST: user_id
  - FILE: image
*/

if (!isset($_POST['user_id']) || !isset($_FILES['image'])) {
    echo json_encode(["error" => "user_id and image required"]);
    exit;
}

$user_id = $_POST['user_id'];

$folder = "../uploads/stories/";
$imageName = time() . "_" . $_FILES['image']['name'];
$imageTmp = $_FILES['image']['tmp_name'];

if (move_uploaded_file($imageTmp, $folder . $imageName)) {

    $sql = "INSERT INTO stories (user_id, image) VALUES ('$user_id', '$imageName')";
    $conn->query($sql);

    echo json_encode([
        "success" => true,
        "image" => $imageName
    ]);

} else {
    echo json_encode(["error" => "Image upload failed"]);
}
?>
