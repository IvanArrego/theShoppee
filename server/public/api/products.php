<?php
  require_once("functions.php");
  require_once("db_connection.php");
  set_exception_handler("error_handler");
  print_r($conn);

  $query = "SELECT * FROM `wicked-sales`";
  $result = mysqli_query($conn, $query);

  if (!$result){
      print ("error" . mysqli_error($conn));
      exit();
  };
?>
