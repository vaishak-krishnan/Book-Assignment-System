<?php
include 'db_config.php';

$sql = "SELECT id, title, author, assigned_to, time_of_issue FROM books WHERE assigned_to IS NOT NULL";
$result = $conn->query($sql);

$assignedBooks = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $assignedBooks[] = $row;
    }
}

echo json_encode($assignedBooks);

$conn->close();
?>
