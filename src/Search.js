import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {
  static PropTypes = {
    changeBook: PropTypes.func.isRequired,
    dataBook: PropTypes.array
  };

  state = {
    query: '',
    books: []
  };

  handleUpdateQuery (query) {
      if (!!query) {
          BooksAPI.search(query).then(data => {
              if (!!data.error) {
                  this.setState({
                      books: []
                  });
              } else {
                  let checkForShelfs = data.map(book => {
                      for (var i = 0; i < this.props.dataBook.length; i++) {
                          if (this.props.dataBook[i].id === book.id) {
                              book.shelf = this.props.dataBook[i].shelf;
                          }
                      }
                      return book;
                  })
                  this.setState({
                      books: checkForShelfs
                  })
              }
          })
      }
  }

  displaySearchResults() {
    const { books } = this.state;
    let changeBook = this.props.changeBook;
    
    if (this.state.books != books) {
      this.setState({ books });
    } else {
      return books.error
        ?   
            <div>
            Your Result Is Not There
            </div>
        : books.map((book, index) => {
            return <Book 
                    changeBook={changeBook} 
                    key={book.id}
                    book={book} 
            />;
          });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
         {}
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              
              onChange={event => this.handleUpdateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">

            <ol className="books-grid">
                {this.displaySearchResults()}
            </ol>

        </div>
      </div>
    );
  }
}

export default Search;