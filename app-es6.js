class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Methods
  addBookToList(book) {
    const list = document.getElementById('book-list');

    // create tr elements
    const row = document.createElement('tr');
    // inster table data into columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  
  `;
    // append into html
    list.appendChild(row);
  }

  showAlert(message, className) {
    // creae a div
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container'),
      form = document.querySelector('#book-form');

    // Instert alert
    container.insertBefore(div, form);

    // Time out after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      // remove tr element...a > td > tr
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// local storage class

class Store {
  // methods
  static getBooks() {
    // initialize books
    let books;
    if (localStorage.getItem('books') === null) {
      // return empty array
      books = [];
    } else {
      // get the books
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  static displayBook() {
    const books = Store.getBooks();

    // loop through the books
    books.forEach(function(book) {
      const ui = new UI();

      // add book to ui
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    // loop through the books
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBook);

// Event LIstener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // get form values
  const title = document.querySelector('#title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // console.log(ui);

  // validate
  if (title == '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('Please fill all fileds', 'error');
  } else {
    // add book to ui
    ui.addBookToList(book);

    // add to localstorage
    Store.addBook(book);

    // show alert
    ui.showAlert('Book Added', 'success');

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// event listner for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // remove from local stpre
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show an alert
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
