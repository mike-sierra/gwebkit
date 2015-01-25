<?php
   header("Content-Type: text/event-stream\n\n");
/*
   echo "retry: 60000\n";
   echo "event: item\n";
   echo "id: http://server.name/blog/item01.html\n";
*/
   echo "data: This is the first item\n";
   echo "\n";
/*
   echo "event: item\n";
   echo "id: http://server.name/blog/item02.html\n";
   echo "data: This is the second item\n";
   echo "\n";
   echo "event: item\n";
   echo "id: http://server.name/blog/item03.html\n";
   echo "data: This is the third item\n";
   echo "\n";
*/

?>
