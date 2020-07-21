const body = document.querySelector('body');
const openFormBtn = document.querySelector('.openForm');
const formDiv = document.querySelector('.newBookForm');
const form = document.querySelector('#form');
const cancelBtn = document.querySelector('#cancel');
const confirmBtn = document.querySelector('#confirm');
const library = document.querySelector('.library');
const radioBtns = document.querySelectorAll('input[name = "readStatus"]');

// * Book objects constructor
function Book(title, authur, numberOfPages, readStatus) {
  this.title = title,
    this.authur = authur,
    this.numberOfPages = numberOfPages,
    this.readStatus = readStatus
}
// * Toggle the read status
Book.prototype.toggleStatus = function () {
  this.readStatus === 'Have Read' ? this.readStatus = 'Not Read' : this.readStatus = 'Have Read';
}
// * Take the input and store the new book objects into an array
let myLibrary = [];

function addBookToLibrary(book) {
  const newBook = new Book(...book);
  myLibrary.push(newBook);
}
// GTD,David Allen,270,Have read
// * "Add A New Book" button which brings up the form
openFormBtn.addEventListener('click', () => {
  formDiv.style.display = 'block';
  body.style.background = 'rgba(0,0,0,0.1)';
})
// * “Okay” button which collects user input and close the form
let bookInfo = [];
let text = '';
confirmBtn.addEventListener('click', () => {
  text = '';
  for (let i = 0; i < form.length - 2; i++) {
    text += form.elements[i].value + ',';
  }
  for (const btn of radioBtns) {
    if (btn.checked) text += btn.value;
    btn.checked = false;
  };
  for (let i = 0; i < form.length - 2; i++) {
    form.elements[i].value = '';
  }
  bookInfo = text.split(',');
  addBookToLibrary(bookInfo);
  displayLastBook();
  formDiv.style.display = 'none';
  body.style.background = 'white';
})
// * "Cancel" button which just close the form
cancelBtn.addEventListener('click', () => {
  formDiv.style.display = 'none';
  body.style.background = 'white';
})

// * Display each book on the page
let allBooks = [];

function displayLastBook() {
  let lastBook = myLibrary[myLibrary.length - 1];
  // * Creae myBook div element
  const myBook = document.createElement('div');
  myBook.className = 'book';

  // * Title
  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = lastBook.title;
  myBook.appendChild(title);
  // * Authur
  const authur = document.createElement('p');
  authur.className = 'authur';
  authur.textContent = lastBook.authur;
  myBook.appendChild(authur)
  // * Pages
  const pages = document.createElement('p');
  pages.className = 'pages';
  pages.textContent = lastBook.numberOfPages + ' pages';
  myBook.appendChild(pages)
  // * Read status
  const readStatusBtn = document.createElement('button');
  readStatusBtn.className = 'readStatus';
  readStatusBtn.textContent = lastBook.readStatus;
  toggleStatusStyle(readStatusBtn);
  readStatusBtn.addEventListener('click', () => {
    lastBook.toggleStatus();
    readStatusBtn.textContent = lastBook.readStatus;
    toggleStatusStyle(readStatusBtn);
  });

  myBook.appendChild(readStatusBtn);
  // * Delete button
  const del = document.createElement('button');
  del.className = 'delBook';
  del.textContent = 'Del';
  removeBook(del);
  myBook.appendChild(del);

  // * Append myBook div element to library
  allBooks.push(myBook);
  library.appendChild(myBook);
}
// * Change readStatus button style
function toggleStatusStyle(btn) {
  if (btn.textContent === 'Have Read') {
    btn.style.background = '#f6faf3';
    btn.style.color = '#4c9e0c';
  } else if (btn.textContent === 'Not Read') {
    btn.style.background = '#fef7f7';
    btn.style.color = '#e66464';
  }
}
// * Remove the book when delete buttons is clicked
function removeBook(btn) {
  btn.addEventListener('click', () => {
    const bookDiv = event.target.parentNode;
    for (let i = 0; i < allBooks.length; i++) {
      if (allBooks[i] === bookDiv) {
        myLibrary.splice(i, 1);
        allBooks.splice(i, 1);
        library.removeChild(bookDiv);
      }
    }
  })
}

// ? Group the book cards based on reading status
// ? Give reading status 3 options to choose (add "reading")