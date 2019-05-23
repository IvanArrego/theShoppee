<?php
  require_once("functions.php");
  require_once("db_connection.php");
  set_exception_handler("error_handler");
  startup();
  if (!$conn){
    throw new Exception(mysqli_connect_error($conn));
  };
  $query = "SELECT * FROM `products` WHERE `price` > 2000";

  $result = mysqli_query($conn, $query);

  if (!$result){
    print ("error" . mysqli_error($conn));
    exit();
  }
  $output = [
    "data" => [] 
];

while($row =  mysqli_fetch_assoc ( $result )){   
    array_push($output["data"],$row);
}

$json_output = json_encode($output);

print $json_output;


?>
