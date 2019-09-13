<?php
require_once 'functions.php';
require_once 'db_connection.php';
startup();

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'DELETE'){
    if (!$conn){
      throw new Exception(mysqli_connect_error($conn));
    };
  
    // if(empty($_GET['id'])){
    //   $id = '';
    //   print($id);
    // } else {
    //   $id = $_GET['id'];
    //   print($id);
    // }
    
    // if (empty($id)|| !is_numeric($id) ){
    //  throw new Exception("id needs to be a number");
    // }
    $query = "DELETE FROM `cart`";
  
    $result = mysqli_query($conn, $query);
  
    if (!$result){
      print ("error" . mysqli_error($conn));
      exit();
    }
  }
  
  else {
    http_response_code(404);
    print(json_encode([
      'error' => 'Not Found',
      'message' => "Cannot $method /api/cart.php"
    ]));
  }

?>