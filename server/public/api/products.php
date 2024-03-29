<?php
  require_once("functions.php");
  require_once("db_connection.php");
  set_exception_handler("error_handler");
  
  startup();

  if (!$conn){
    throw new Exception(mysqli_connect_error($conn));
  };

  if(empty($_GET['id'])){
    $id = '';
  } else {
    $id = $_GET['id'];
  }
  
  if (empty($id)){
    $whereClause = "";
  } else {
    if (is_numeric($id)){
      $whereClause = "WHERE `id` = $id" ;
    } else {
      throw new Exception("id needs to be a number");
    }
  }
  $query = "SELECT * FROM `products` $whereClause";

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


?>
