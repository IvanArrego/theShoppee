<?php

require_once 'functions.php';
require_once 'db_connection.php';
startup();

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
$items = json_decode($item,true);
$itemized = $items[0];
$name = $itemized['name'];
$id = $itemized['id'];
$price = $itemized['price'];
$image = addslashes($itemized['image']);
$short_description = addslashes($itemized['shortDescription']);
$long_description = addslashes($itemized['longDescription']);

if ($method == 'GET') {
  $query = "SELECT * FROM `cart`";
  $result = mysqli_query($conn, $query);
  if (!$result){
    print ("error" . mysqli_error($conn));
      exit();
  }
  $output = [
  ];
  while($row =  mysqli_fetch_assoc ( $result )){   
    array_push($output,$row);
  }
  $json_output = json_encode($output);
  print $json_output;
} else if ($method == 'POST') {
    http_response_code(201);
    print($item);
    $query = "INSERT INTO `cart` (`productID`, `name`, `price`, `image`, `shortDescription`,`longDescription`) VALUES ('$id', '$name', '$price','$image', '$short_description', '$long_description')";
    $result = mysqli_query($conn, $query);
    if(!$result){
      throw new Exception( mysqli_error($conn) );
    }

} else if($method == 'DELETE'){
  if (!$conn){
    throw new Exception(mysqli_connect_error($conn));
  };

  if(empty($_GET['id'])){
    $id = '';
    print($id);
  } else {
    $id = $_GET['id'];
    print($id);
  }
  
  if (empty($id)|| !is_numeric($id) ){
   throw new Exception("id needs to be a number");
  }
  $query = "DELETE FROM `cart` where `id` = $id";

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
