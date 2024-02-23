'use strict';
// Przygotuj referencję do szablonu oraz listy .books-list
const bookTemplate = Handlebars.compile(document.getElementById('template-book').innerHTML);
const booksListContainer = document.querySelector('.books-list');


// Dodaj nową funkcję render
function render() {
  // Przejdź po każdym elemencie z dataSource.books
  dataSource.books.forEach(book => {
    // Wygeneruj kod HTML na podstawie szablonu oraz danych o konkretnej książce
    const generatedHTML = bookTemplate(book);
    // Wygenerowany element DOM
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    // Dołącz wygenerowany element DOM jako nowe dziecko DOM do listy .books-list
    booksListContainer.appendChild(bookElement);
  });
}



//Dodaj pusą tablicę na ulubione książki
const favoriteBooks = [];
console.log(favoriteBooks);

//Dodaj nową funckję initActions
function initActions(){

  //Przygotuj referencję do listy wszystkich elementów .book__image w liście .booksList.
  const bookImages = document.querySelectorAll('.books-list .book__image');


  //Przejdź po każdym elemencie z tej listy.
  bookImages.forEach(bookImage=>{
    bookImage.addEventListener('dblclick', function (event){
      event.preventDefault();
      const bookId = event.target.dataset.id;
      favoriteBooks.push(bookId);
      event.target.classList.add('favorite');
    });
  });
}

// Wywołanie funkcji renderującej książki
render();
initActions();