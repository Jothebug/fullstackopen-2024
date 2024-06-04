require("dotenv").config();
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (_, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  try {
    const user = await User.findById(decodedToken.id);
    const { title, author, url, likes } = request.body;
    const blog = await new Blog({
      title,
      author,
      url,
      likes: likes ?? 0,
      user: user.id,
    }).save();

    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  try {
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(404).end();

    if (blog?.user?.toString() === user?._id?.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "no authentication on selected item" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
