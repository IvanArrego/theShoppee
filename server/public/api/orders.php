<?php
require_once 'functions.php';
require_once 'db_connection.php';
startup();

$order = file_get_contents('php://input');
$order = json_decode($order,true);
$name = $order['name'];
$address = $order['address'];
$email = $order['email'];
$phone = $order['phone'];
$credit_card = $order['creditCard'];
$credit_card_exp = $order['expiration'];
$credit_card_cvv = $order['cvv'];
$order_items = $order['cart'];
$escape_order_items = addslashes($order_items);
$output = [];

$query = "INSERT INTO `orders` (`customerName`, `customerAddress`, `customerEmail`, `customerPhone`, `customerCreditCard`,`customerCVV`, `customerExp`, `customerOrder`) VALUES ('$name', '$address','$email', '$phone', '$credit_card', '$credit_card_exp', '$credit_card_cvv', '$escape_order_items')";
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception( mysqli_error($conn) );
}

$json_output = json_encode($output);
print_r($json_output);

?>