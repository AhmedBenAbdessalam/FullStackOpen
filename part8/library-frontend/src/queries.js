import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title, 
    author: $author, 
    published: $published, 
    genres: $genres) {
    title
    author {
      name
    }
    published
  }
}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const ALL_BOOKS_GENRE = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`
export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`
export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name
      born
      bookCount
    }
  }
  
`