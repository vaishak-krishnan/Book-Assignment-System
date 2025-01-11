document.addEventListener("DOMContentLoaded", function () {
    const booksContainer = document.getElementById("books");

    // Function to render books
    function renderBooks() {
        fetch("php/fetch_books.php")
            .then((response) => response.json())
            .then((books) => {
                booksContainer.innerHTML = ""; // Clear existing books
                books.forEach((book) => {
                    const card = document.createElement("div");
                    card.className = "col-md-4 mb-3";
                    card.innerHTML = `
                        <div class="card">
                            <img src="${book.image_url}" class="card-img-top" alt="${book.title}">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">Author: ${book.author}</p>
                                <p class="card-text">Assigned To: ${book.assigned_to || "None"}</p>
                                <button class="btn btn-primary assign-btn" data-id="${book.id}">Assign</button>
                                ${
                                    book.assigned_to
                                        ? `<button class="btn btn-danger remove-assignment-btn" data-id="${book.id}">Remove Assignment</button>`
                                        : ""
                                }
                                <hr>
                                <button class="btn btn-warning edit-btn" data-id="${book.id}" data-title="${book.title}" data-author="${book.author}" data-image="${book.image_url}">Edit</button>
                                <button class="btn btn-danger remove-book-btn" data-id="${book.id}">Remove Book</button>
                            </div>
                        </div>`;
                    booksContainer.appendChild(card);
                });

                // Add event listeners for assign and remove assignment buttons
                document.querySelectorAll(".assign-btn").forEach((button) => {
                    button.addEventListener("click", () => {
                        const bookId = button.dataset.id;
                        const userName = prompt("Enter the name of the person to assign this book:");

                        if (userName) {
                            fetch("php/assign_book.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: `action=assign&book_id=${bookId}&user_name=${encodeURIComponent(userName)}`,
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    alert(result.message);
                                    if (result.status === "success") renderBooks();
                                });
                        }
                    });
                });

                document.querySelectorAll(".remove-assignment-btn").forEach((button) => {
                    button.addEventListener("click", () => {
                        const bookId = button.dataset.id;

                        if (confirm("Are you sure you want to remove the assignment?")) {
                            fetch("php/assign_book.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: `action=remove&book_id=${bookId}`,
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    alert(result.message);
                                    if (result.status === "success") renderBooks();
                                });
                        }
                    });
                });

                // Add event listeners for edit book buttons
                document.querySelectorAll(".edit-btn").forEach((button) => {
                    button.addEventListener("click", (e) => {
                        const bookId = button.dataset.id;
                        const bookTitle = button.dataset.title;
                        const bookAuthor = button.dataset.author;
                        const bookImage = button.dataset.image;

                        // Populate modal fields
                        document.getElementById("editBookId").value = bookId;
                        document.getElementById("editBookTitle").value = bookTitle;
                        document.getElementById("editBookAuthor").value = bookAuthor;
                        document.getElementById("editBookImage").value = bookImage;

                        // Show the edit modal
                        const editModal = new bootstrap.Modal(document.getElementById("editBookModal"));
                        editModal.show();
                    });
                });

                // Add event listeners for remove book buttons
                document.querySelectorAll(".remove-book-btn").forEach((button) => {
                    button.addEventListener("click", () => {
                        const bookId = button.dataset.id;

                        if (confirm("Are you sure you want to remove this book?")) {
                            fetch("php/manage_books.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: `action=delete&id=${bookId}`,
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    alert(result.message);
                                    if (result.status === "success") renderBooks();
                                });
                        }
                    });
                });
            });
    }

    // Add book functionality
    document.getElementById("saveAddBookBtn").addEventListener("click", () => {
        const title = document.getElementById("addBookTitle").value.trim();
        const author = document.getElementById("addBookAuthor").value.trim();
        const imageUrl = document.getElementById("addBookImage").value.trim();

        if (title && author && imageUrl) {
            fetch("php/manage_books.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `action=add&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&image_url=${encodeURIComponent(imageUrl)}`,
            })
                .then((response) => response.json())
                .then((result) => {
                    alert(result.message);
                    if (result.status === "success") {
                        renderBooks();
                        // Close modal
                        document.getElementById("addBookForm").reset();
                        const addModal = bootstrap.Modal.getInstance(document.getElementById("addBookModal"));
                        addModal.hide();
                    }
                });
        }
    });

    // Save edit functionality
    document.getElementById("saveEditBookBtn").addEventListener("click", () => {
        const bookId = document.getElementById("editBookId").value;
        const title = document.getElementById("editBookTitle").value.trim();
        const author = document.getElementById("editBookAuthor").value.trim();
        const imageUrl = document.getElementById("editBookImage").value.trim();

        if (title && author && imageUrl) {
            fetch("php/manage_books.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `action=edit&id=${bookId}&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&image_url=${encodeURIComponent(imageUrl)}`,
            })
                .then((response) => response.json())
                .then((result) => {
                    alert(result.message);
                    if (result.status === "success") {
                        renderBooks();
                        // Close modal
                        const editModal = bootstrap.Modal.getInstance(document.getElementById("editBookModal"));
                        editModal.hide();
                    }
                });
        }
    });

    // Initial render
    renderBooks();
});
