<?php
  include('functions.php');

  // Get the ID of the question to display from the query string
  $id = $_GET['id'];

  // Call the question function to generate the HTML for the question
  $html = errorQuestion($id);

  echo $html;

?>