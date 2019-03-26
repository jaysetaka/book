// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// add book to list prototype function
UI.prototype.addBookToList = function(book) {
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
};

// show alert
UI.prototype.showAlert = function(message, className) {
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
};

// delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    // remove tr element...a > td > tr
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

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

  // validate
  if (title == '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('Please fill all fileds', 'error');
  } else {
    // add book to ui
    ui.addBookToList(book);

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

  // show an alert
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
