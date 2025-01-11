<?php
include 'db_config.php';

$sql = "SELECT id, title, author, assigned_to, image_url FROM books";
$result = $conn->query($sql);

$books = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
}

echo json_encode($books);
$conn->close();
?>
