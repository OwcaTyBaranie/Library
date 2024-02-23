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

// Wywołanie funkcji renderującej książki
render();
