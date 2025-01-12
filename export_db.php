<?php
// Database credentials
$host = "localhost"; // Change this if not running on localhost
$username = "root";  // Your MySQL username
$password = "";      // Your MySQL password
$database = "book_assignment"; // Name of the database to export

// Output file name
$backup_file = $database . "_" . date("Y-m-d_H-i-s") . ".sql";

// Command to export database
$command = "mysqldump --user=$username --password=$password --host=$host $database > $backup_file";

// Execute the command
exec($command, $output, $return_var);

// Check if the command was successful
if ($return_var === 0) {
    echo "Database exported successfully to: " . $backup_file;
} else {
    echo "Error exporting database.";
    print_r($output);
}
?>
