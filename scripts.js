document.addEventListener("DOMContentLoaded", function () {
    const booksContainer = document.getElementById("books");

    // Fetch books from the server
    fetch("fetch_books.php")
        .then((response) => response.json())
        .then((books) => {
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
                                ? `<button class="btn btn-danger remove-btn" data-id="${book.id}">Remove Assignment</button>`
                                : ""
                        }
                    </div>
                </div>`;
            
            
                booksContainer.appendChild(card);
            });

            // Event listeners for Assign buttons
            document.querySelectorAll(".assign-btn").forEach((button) => {
                button.addEventListener("click", function () {
                    const bookId = this.dataset.id;
                    const userName = prompt("Enter the name of the person to assign this book:");

                    if (userName) {
                        fetch("assign_book.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: `action=assign&book_id=${bookId}&user_name=${encodeURIComponent(userName)}`,
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                alert(result.message);
                                if (result.status === "success") location.reload();
                            });
                    }
                });
            });

            // Event listeners for Remove Assignment buttons
            document.querySelectorAll(".remove-btn").forEach((button) => {
                button.addEventListener("click", function () {
                    const bookId = this.dataset.id;

                    if (confirm("Are you sure you want to remove the assignment?")) {
                        fetch("assign_book.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: `action=remove&book_id=${bookId}`,
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                alert(result.message);
                                if (result.status === "success") location.reload();
                            });
                    }
                });
            });
        });
});
