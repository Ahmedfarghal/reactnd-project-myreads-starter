import React from 'react';
import Book from './Book';

function Bookshelf(props) {
  let dataBook = props.dataBook;
  let changeBook = props.changeBook;
  let shelf = props.shelf;
  let title = props.title;
  let hayShelf;

  hayShelf = dataBook.filter(book => book.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {hayShelf.map(book => <Book changeBook={changeBook} book={book} key={book.id} />)}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf;
