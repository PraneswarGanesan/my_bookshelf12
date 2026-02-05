const bookTable = document.getElementById('bookTable');
const addBookForm = document.getElementById('addBookForm');

// Array to store book inventory data
let books = [];

function displayBooks() {
    // Clear existing rows
    while (bookTable.rows.length > 1) {
        bookTable.deleteRow(1);
    }

    // Add rows for each book
    books.forEach((book, index) => {
        const row = bookTable.insertRow();
        row.insertCell().innerText = book.title;
        row.insertCell().innerText = book.author;
        row.insertCell().innerText = book.quantity;
        const actionCell = row.insertCell();
        actionCell.innerHTML = `<button onclick="removeBook(${index})">Remove</button>`;
    });
}

function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const quantity = document.getElementById('quantity').value;
    books.push({ title, author, quantity: parseInt(quantity) });
    displayBooks();
    addBookForm.reset();
}

function removeBook(index) {
    books.splice(index, 1);
    displayBooks();
}

addBookForm.addEventListener('submit', addBook);
