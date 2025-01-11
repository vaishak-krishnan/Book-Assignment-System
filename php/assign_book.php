<?php
include 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $bookId = $_POST['book_id'];

    if ($action === 'assign') {
        $userName = $_POST['user_name'];
        $timeOfIssue = date('Y-m-d H:i:s');

        $sql = "UPDATE books SET assigned_to = ?, time_of_issue = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $userName, $timeOfIssue, $bookId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book assigned successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to assign book"]);
        }
    } elseif ($action === 'remove') {
        $sql = "UPDATE books SET assigned_to = NULL, time_of_issue = NULL WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $bookId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Assignment removed successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to remove assignment"]);
        }
    }

    $conn->close();
}
?>
