<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Agar local React app hai

$stories = [
    [
        "id" => 1,
        "username" => "Alice",
        "avatar" => "http://localhost:8082/insta_clone/uploads/user1.png",
        "content" => "http://localhost:8082/insta_clone/uploads/story1.jpg"
    ],
    [
        "id" => 2,
        "username" => "Bob",
        "avatar" => "http://localhost:8082/insta_clone/uploads/user2.png",
        "content" => "http://localhost:8082/insta_clone/uploads/story2.jpg"
    ]
];

echo json_encode([
    "status" => true,
    "posts" => $posts,
    "stories" => $stories
]);
?>
