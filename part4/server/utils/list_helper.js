//ex: 4.3
const dummy = (blogs) => 1;

// ex: 4.4
const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  return blogs.reduce((acc, item) => acc + item.likes, 0);
};

// ex: 4.5*
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favoriteBlog = blogs.reduce(
    (acc, item) => (acc.likes > item.likes ? acc : item),
    {}
  );

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

// ex: 4.6*
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const author = {};
  for (const item of blogs) {
    author[item.author] = {
      author: item.author,
      blogs: author[item.author]?.blogs ? author[item.author].blogs + 1 : 1,
    };
  }

  return Object.values(author).reduce(
    (acc, item) => (acc.blogs > item.blogs ? acc : item),
    {}
  );
};

// ex: 4.7*
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const groupAuthor = {};
  for (const item of blogs) {
    groupAuthor[item.author] = {
      author: item.author,
      likes: groupAuthor[item.author]?.likes
        ? groupAuthor[item.author].likes + item.likes
        : item.likes,
    };
  }

  return Object.values(groupAuthor).reduce(
    (acc, item) => (acc.likes > item.likes ? acc : item),
    {}
  );
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

module.exports = {
  dummy,
  totalLikes,
  blogs,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
