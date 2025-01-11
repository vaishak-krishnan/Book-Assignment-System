<?php
include 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $bookId = $_POST['book_id'];

    if ($action === 'assign') {
        $userName = $_POST['user_name'];

        $sql = "UPDATE books SET assigned_to = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $userName, $bookId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book assigned successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to assign book"]);
        }
    } elseif ($action === 'remove') {
        $sql = "UPDATE books SET assigned_to = NULL WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $bookId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book assignment removed successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to remove book assignment"]);
        }
    }

    $conn->close();
}
?>
