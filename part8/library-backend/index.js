require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const typeDefs = require("./typeDefs");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connection", err.message));

const resolvers = {
  Query: {
    allBooks: async () => await Book.find({}).populate("author"),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    authorCount: () => Author.collection.countDocuments(),
    me: async (_, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author, bookCount: 1 });
          await author.save();
        } else {
          author.bookCount += 1;
          await author.save();
        }
        let book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author,
        });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError("The book has already existed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name, error },
        });
      }
    },

    editAuthor: async (_, args, context) => {
      if (!args.name || !args.born) return null;

      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        const filter = { name: args.name };
        const update = { born: args.born };
        const existedAuthor = await Author.findOne(filter);
        if (!existedAuthor) {
          throw new GraphQLError("The author does not exist", {
            extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name },
          });
        }
        const upadtedAuthor = await Author.findOneAndUpdate(filter, update, {
          new: true,
        });
        return upadtedAuthor;
      } catch (error) {
        throw new GraphQLError("Editing born year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },

    createUser: async (_, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, _ }) => {
    const auth = req?.headers?.authorization ?? "";
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
