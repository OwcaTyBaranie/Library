/* eslint-disable no-unused-vars */
'use strict';
// Przygotuj referencję do szablonu oraz listy .books-list
const bookTemplate = Handlebars.compile(document.getElementById('template-book').innerHTML);
const booksListContainer = document.querySelector('.books-list');

//Dodaj pusą tablicę na ulubione książki
const favoriteBooks = [];
console.log('FavoriteBooks:', favoriteBooks);
//Dodaj pustą tablicę do filtrowanych obiektów
const filters = [];
console.log('FilteredBooks:', filters);


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





function initActions() {
  // Przygotuj referencję do listy wszystkich elementów .book__image w liście .books-list
  const bookImages = document.querySelectorAll('.books-list .book__image');

  // Przejdź po każdym elemencie z tej listy
  for (let i = 0; i < bookImages.length; i++) {
    const bookImage = bookImages[i];
    bookImage.addEventListener('click', function (event) {
      event.preventDefault(); // Zapobiegamy domyślnemu zachowaniu (przewijaniu do góry strony)

      // Sprawdź, czy kliknięty element zawiera się w kontenerze .book__image
      if (event.target.offsetParent.classList.contains('book__image')) {
        const bookId = event.target.offsetParent.dataset.id;


        // Sprawdź, czy książka jest już ulubiona
        const index = favoriteBooks.indexOf(bookId);
        if (index !== -1) {
          // Jeśli książka jest już ulubiona, usuń ją z ulubionych i usuń klasę favorite
          favoriteBooks.splice(index, 1);
          event.target.offsetParent.classList.remove('favorite');
        } else {
          // Jeśli książka nie jest ulubiona, dodaj ją do ulubionych i dodaj klasę favorite
          favoriteBooks.push(bookId);
          event.target.offsetParent.classList.add('favorite');
        }

        // Wyświetl aktualną listę ulubionych książek w konsoli
        console.log('FavoriteBooks:', favoriteBooks);
      }
    });
  }
}

const bookFiltred = document.querySelector('.filters');
bookFiltred.addEventListener('click', function(event){
  handleFiltersChange(event);
});

function handleFiltersChange(event){
  // Pobierz element, na którym zostało kliknięte
  const clickedElement = event.target;

  // Sprawdź, czy kliknięty element jest checkboxem
  if (clickedElement.tagName === 'INPUT' &&
       clickedElement.type === 'checkbox' &&
       clickedElement.name === 'filter') {
    // Jeśli kliknięto na checkbox, sprawdź jego stan
    if (clickedElement.checked) {
      // Jeśli jest zaznaczony, dodaj jego wartość do tablicy filters
      filters.push(clickedElement.value);
    } else {
      // Jeśli jest odznaczony, usuń jego wartość z tablicy filters
      const index = filters.indexOf(clickedElement.value);
      if (index !== -1) {
        filters.splice(index, 1);
      }
    }

    // Wyświetl aktualną tablicę filtrów w konsoli
    console.log('Current filters:', filters);
    // Po zmianie filtrów, wywołaj funkcję filterBooks, aby zaktualizować widok książek
    filterBooks();
  }
}

function filterBooks() {
  // Pętla po wszystkich książkach w dataSource.books
  dataSource.books.forEach(book => {
    let shouldBeHidden = false; // Domyślnie książka nie jest ukryta

    // Pętla po wszystkich filtrach
    for (const filter of filters) {
      // Ustalanie, czy dana właściwość w details danej książki spełnia warunek filtrowania
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break; // Przerwanie pętli, jeśli warunek nie jest spełniony
      }
    }

    // Pętla warunkowa sprawdzająca, czy książka powinna być ukryta
    if (shouldBeHidden) {
      // Dodanie klasy hidden do elementu .book__image danej książki
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (bookImage) {
        bookImage.classList.add('hidden');
      }
    } else {
      // Usunięcie klasy hidden, jeśli książka nie powinna być ukryta
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (bookImage) {
        bookImage.classList.remove('hidden');
      }
    }
  });
}






// Wywołanie funkcji renderującej książki
render();
initActions();
