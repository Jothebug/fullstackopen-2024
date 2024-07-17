const typeDefs = `
  type User {
     username: String!
     favoriteGenre: String!
     id: ID! 
  }
  type Token {value: String!}
  type Author {
     name: String!
     id: ID!
     born: Int
     bookCount: Int
  }
  type Book {
     title: String!
     published: Int!
     author: Author!
     id: ID!
     genres: [String!]!
  }

  type Query {
    allBooks: [Book!]!
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;
module.exports = typeDefs;
