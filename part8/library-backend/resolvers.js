const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    allBooks: async (_, args) => {
      if (!args.genre || args.genre === "All genres")
        return await Book.find({}).populate("author");
      const filteredBooks = (await Book.find({}).populate("author")).filter(
        ({ genres } = {}) => genres.includes(args.genre)
      );
      return filteredBooks;
    },
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    authorCount: () => Author.collection.countDocuments(),
    me: async (_, args, context) => context.currentUser,
    allGenres: async () => await Book.distinct("genres"),
    recommendedList: async (_, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const favoriteGenre = currentUser.favoriteGenre;
      let recommendedList = [];
      if (favoriteGenre) {
        recommendedList = (await Book.find({}).populate("author")).filter(
          ({ genres }) => genres.includes(favoriteGenre)
        );
      }
      return recommendedList;
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = await context.currentUser;
      console.log("context", context);
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
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
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
      const user = new User({
        username: args.username,
        ...(args.favoriteGenre && { favoriteGenre: args.favoriteGenre }),
      });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
