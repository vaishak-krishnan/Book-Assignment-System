<?php
include 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add') {
        // Add a new book
        $title = $_POST['title'];
        $author = $_POST['author'];
        $image_url = $_POST['image_url'];

        $sql = "INSERT INTO books (title, author, image_url) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $title, $author, $image_url);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book added successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to add book"]);
        }
    } elseif ($action === 'edit') {
        // Edit an existing book
        $id = $_POST['id'];
        $title = $_POST['title'];
        $author = $_POST['author'];
        $image_url = $_POST['image_url'];

        $sql = "UPDATE books SET title = ?, author = ?, image_url = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $title, $author, $image_url, $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update book"]);
        }
    } elseif ($action === 'delete') {
        // Remove a book
        $id = $_POST['id'];

        $sql = "DELETE FROM books WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Book removed successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to remove book"]);
        }
    }

    $conn->close();
}
?>
