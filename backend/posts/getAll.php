<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 

$posts = [
    [
        "id" => 1,
        "username" => "arfa7795",
        "profileImg" => "http://localhost:8082/insta_clone/uploads/user1.png",
        "location" => "Bangalore",
        "image" => "http://localhost:8082/insta_clone/uploads/post1.jpg",
        "caption" => "Fun day ❤️",
        "likes" => 340,
        "comments" => ["Nice!", "Cool 🔥"]
    ],
    [
        "id" => 2,
        "username" => "sarah",
        "profileImg" => "http://localhost:8082/insta_clone/uploads/user2.png",
        "location" => "Delhi",
        "image" => "http://localhost:8082/insta_clone/uploads/post2.jpg",
        "caption" => "Happy vibes ✨",
        "likes" => 210,
        "comments" => []
    ]
];


