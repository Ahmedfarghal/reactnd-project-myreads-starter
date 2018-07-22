import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import Search from './Search';
import './App.css';

class App extends Component {
  static PropTypes = {
    changeBook: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired
  };

  state = {
    books: []
  };
//is invoked immediately after a component is mounted (Ajax Request)
//componentDidMount lifecycle 
  componentDidMount() {
    BooksAPI.getAll().then(filtered =>
      this.setState({
        books: filtered
      })
    );
  }

  //change the book and self place 
  changeBook = (book, shelf) => {
    if (!this.state.books) {
      //console.log(this.state)
      BooksAPI.update(book, shelf)
        .then(() => (shelf !== 'none' ? this.context.router.history.push('/') : null))
        .catch(() => alert('Something went wrong! Please try again!'));
    } else {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(object => object.id !== book.id).concat([book])
        }));
      });
    }
  };

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
        
        <Route exact path="/" render={() =>
            <div className="list-books">
              <div className="list-books-title">


                <h1>MyReads</h1>
              </div>

                      <div className="list-books-content">
                        <div>
                          <Bookshelf
                            title="Currently to Reading"
                            changeBook={this.changeBook.bind(this)}
                            shelf={
                              `currentlyReading`
                            }
                            dataBook={this.state.books}
                          />
                          <Bookshelf
                            title="Want to read"
                            changeBook={this.changeBook.bind(this)}
                            shelf={
                              `wantToRead`
                            }
                            dataBook={this.state.books}
                          />
                          <Bookshelf
                            title="Read"
                            changeBook={this.changeBook.bind(this)}
                            shelf={
                              `read`
                            }
                            dataBook={this.state.books}
                          />
                        </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>}
        />
        <Route
              path="/search"
              render={({ history }) => 
              <Search dataBook={this.state.books} changeBook={this.changeBook.bind(this)} />}
            />

      </div>
    );
  }
}

export default App;
