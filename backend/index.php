<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

echo json_encode([
    "status" => "Backend is running ✅",
    "project" => "Instagram Clone (PHP Backend)",
    "apis" => [
        "Auth" => [
            "Register" => "/backend/auth/register.php",
            "Login" => "/backend/auth/login.php"
        ],
        "Posts" => [
            "Get All Posts" => "/backend/posts/getall.php",
            "Get Posts By User" => "/backend/posts/getbyuser.php",
            "Create Post" => "/backend/posts/create.php"
        ],
        "Stories" => [
            "Get All Stories" => "/backend/stories/getAll.php",
            "Upload Story" => "/backend/stories/upload.php"
        ],
        "Profile" => [
            "Get Profile" => "/backend/users/profile.php?id=USER_ID"
        ]
    ]
]);
?>
