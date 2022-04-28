const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connect to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type Author {
  name: String!
  born: Int
  bookCount: Int!
}
type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author:String, genre:String): [Book!]!
  allAuthors: [Author!]!
}
type Mutation {
  addBook(title:String!, author: String!, published:Int!, genres:[String!]!):Book
  editAuthor(name:String!, setBornTo: Int!): Author
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({})
      if (args.author)
        result = result.filter(book => book.author === args.author)
      if (args.genre)
        result = result.filter(book => book.genres.includes(args.genre))
      return result
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => (await Book.find({ author: { $in: [root.id] } })).length
  },
  Book: {
    author: async (root) => await Author.findById(root.author)
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })
        await author.save()
      }
      const newBook = new Book({ ...args, author: author.id })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newBook
    },
    editAuthor: async (root, args) => {
      console.log(args.setBornTo)
      try {
        const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})