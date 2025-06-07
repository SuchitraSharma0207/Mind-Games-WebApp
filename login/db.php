<?php

$conn=mysqli_connect(
    'localhost',
    'root','','userdb'

);
if($conn){
    echo "";
}else{
    echo "Not Successful Connected to Databse\n";
}
?>
