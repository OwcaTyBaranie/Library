class BooksList {
  constructor() {
    this.bookTemplate = Handlebars.compile(document.getElementById('template-book').innerHTML);
    this.booksListContainer = document.querySelector('.books-list');
    this.favoriteBooks = [];
    this.filters = [];
    this.dataSource = dataSource;
  }

  init() {
    this.render();
    this.initActions();
  }

  render() {
    this.dataSource.books.forEach(book => {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const isFavorite = this.favoriteBooks.includes(book.id);
      let isFiltered = false;
      for (const filter of this.filters) {
        if (!book.details[filter]) {
          isFiltered = true;
          break;
        }
      }

      const bookData = {
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc,
        isFavorite: isFavorite,
        isFiltered: isFiltered
      };

      const bookHTML = this.bookTemplate(bookData);
      this.booksListContainer.insertAdjacentHTML('beforeend', bookHTML);
    });
  }

  determineRatingBgc(rating) {
    const backgroundRating1 = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    const backgroundRating2 = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    const backgroundRating3 = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    const backgroundRating4 = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    if (rating < 6) {
      return backgroundRating1;
    } else if (rating > 6 && rating <= 8) {
      return backgroundRating2;
    } else if (rating > 8 && rating <= 9) {
      return backgroundRating3;
    } else {
      return backgroundRating4;
    }
  }

  initActions() {
    const bookImages = document.querySelectorAll('.books-list .book__image');

    bookImages.forEach(bookImage => {
      bookImage.addEventListener('dblclick', event => {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          const bookId = event.target.offsetParent.dataset.id;
          const index = this.favoriteBooks.indexOf(bookId);
          if (index === -1) {
            this.favoriteBooks.push(bookId);
            event.target.offsetParent.classList.add('favorite');
          }
        }
        console.log('FavoriteBooks:', this.favoriteBooks);
      });

      bookImage.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          const bookId = event.target.offsetParent.dataset.id;
          const index = this.favoriteBooks.indexOf(bookId);
          if (index !== -1) {
            this.favoriteBooks.splice(index, 1);
            event.target.offsetParent.classList.remove('favorite');
          }
        }
        console.log('FavoriteBooks:', this.favoriteBooks);
      });
    });

    const bookFiltered = document.querySelector('.filters');
    bookFiltered.addEventListener('click', event => {
      this.handleFiltersChange(event);
    });
  }

  handleFiltersChange(event) {
    const clickedElement = event.target;
    if (
      clickedElement.tagName === 'INPUT' &&
      clickedElement.type === 'checkbox' &&
      clickedElement.name === 'filter'
    ) {
      if (clickedElement.checked) {
        this.filters.push(clickedElement.value);
      } else {
        const index = this.filters.indexOf(clickedElement.value);
        if (index !== -1) {
          this.filters.splice(index, 1);
        }
      }
      console.log('Current filters:', this.filters);
      this.filterBooks();
    }
  }

  filterBooks() {
    this.dataSource.books.forEach(book => {
      let shouldBeHidden = false;
      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden) {
        if (bookImage) {
          bookImage.classList.add('hidden');
        }
      } else {
        if (bookImage) {
          bookImage.classList.remove('hidden');
        }
      }
    });
  }
}

const app = new BooksList();
app.init();
