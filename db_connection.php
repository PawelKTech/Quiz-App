<?php 

$servername = "localhost";
$username = "root";
$pass = "";

try{
    $conn = new PDO("mysql:host=$servername;dbname=quiz_app_database", $username, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
}
catch(PDOException $e){
    echo "Connection failed: ". $e->getMessage();
    return;
}