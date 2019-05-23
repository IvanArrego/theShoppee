<?php
  require_once("functions.php");
  require_once("db_connection.php");
  set_exception_handler("error_handler");
  startup();
  if (empty($_GET['id'])) {
    $output = file_get_contents('dummy-products-list.json');
    print($output);
  } else {
    readfile('dummy-product-details.json');
  }
//   if (!$conn){
//     throw new Exception(mysqli_connect_error($conn));
//   };
//   $query = "SELECT * FROM `products`";

//   $result = mysqli_query($conn, $query);

//   if (!$result){
//     print ("error" . mysqli_error($conn));
//     exit();
//   }
//   $output = [

// ];

// while($row =  mysqli_fetch_assoc ( $result )){   
//     array_push($output,$row);
// }

// $json_output = json_encode($output);

// print $json_output;


?>
