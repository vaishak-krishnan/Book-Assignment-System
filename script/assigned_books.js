document.addEventListener("DOMContentLoaded", function () {
    const assignedBooksTable = document.getElementById("assigned-books-table");
    const tableHeaders = document.querySelectorAll(".sortable");
    let assignedBooks = [];
    let currentSort = { field: null, order: "asc" }; // Track sorting state

    // Fetch assigned books
    function fetchAssignedBooks() {
        fetch("php/assigned_books.php")
            .then(response => response.json())
            .then(data => {
                assignedBooks = data; // Store data for sorting
                renderTable(assignedBooks);
            });
    }

    // Render table rows
    function renderTable(data) {
        assignedBooksTable.innerHTML = ""; // Clear the table
        data.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.assigned_to || "None"}</td>
                <td>${book.time_of_issue ? formatTime(book.time_of_issue) : "N/A"}</td>
                <td><button class="btn btn-danger remove-assignment-btn" data-id="${book.id}">Remove Assignment</button></td>
            `;
            assignedBooksTable.appendChild(row);
        });
    }

    // Format time for display
    function formatTime(timeString) {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        };
        return new Date(timeString).toLocaleString("en-US", options);
    }

    // Sort data and re-render table
    function sortData(field) {
        const order = currentSort.field === field && currentSort.order === "asc" ? "desc" : "asc"; // Toggle order
        currentSort = { field, order };

        const sortedBooks = [...assignedBooks].sort((a, b) => {
            let aValue = a[field] || ""; // Handle null or undefined
            let bValue = b[field] || "";

            if (field === "time_of_issue") {
                aValue = new Date(aValue || 0).getTime(); // Convert to timestamp
                bValue = new Date(bValue || 0).getTime();
            }

            if (order === "asc") {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });

        renderTable(sortedBooks);

        // Update sort indicators
        updateSortIndicators(field, order);
    }

    // Update sort indicators
    function updateSortIndicators(field, order) {
        tableHeaders.forEach(header => {
            const indicator = header.querySelector(".sort-indicator");
            if (header.dataset.sort === field) {
                indicator.textContent = order === "asc" ? "▲" : "▼"; // Ascending or Descending arrow
            } else {
                indicator.textContent = "▲"; // Default
            }
        });
    }

    // Add click event listeners for sorting
    tableHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const sortField = header.dataset.sort;
            sortData(sortField);
        });
    });

    // Initial fetch
    fetchAssignedBooks();
});
