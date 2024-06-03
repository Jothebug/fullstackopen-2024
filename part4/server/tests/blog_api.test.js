const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

const api = supertest(app);

const getTokenAndLogin = async () => {
  const initUser = { username: "testuser3", password: "testuser3" };
  await api.post("/api/users").send(initUser).expect(201);
  const result = await api
    .post("/api/login")
    .send({ username: initUser.username, password: initUser.password });
  return result.body;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObject = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("ex:4.8-testing GET method", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs are returned with the correct amount of blog posts", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
  });
});

test("ex:4.9-testing the unique identifier property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((item = {}) => {
    assert(Object.keys(item).includes("id"));
  });
});

describe("ex:4.10->4.12-testing POST method", async () => {
  const { token } = await getTokenAndLogin();
  test("ex:4.10-a valid blog can be added", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    };

    const resAddedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await blogsInDb();
    assert.strictEqual(allBlogs.length, initialBlogs.length + 1);
    assert.deepStrictEqual(resAddedBlog.body, allBlogs[allBlogs.length - 1]);
  });

  test("ex:4.11-adding blog with valid likes", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    const resAddedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert(Object.keys(resAddedBlog.body).includes("likes"));
    assert("likes" in resAddedBlog.body);
  });

  test("ex:4.12-verify when request data misses required property with status code 400", async () => {
    const newBlog = {
      title: "testing 400 error",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

test("ex:4.13-testing DELETE method", async () => {
  const { token } = await getTokenAndLogin();
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await blogsInDb();
  const blogsId = blogsAtEnd.map((i) => i.id);
  assert(!blogsId.includes(blogToDelete.id));
});

test("ex:4.14-testing PUT method", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedPost = await api
    .put(`/api/blogs/${blogToUpdate.id}`, { likes: blogToUpdate.likes + 1 })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(blogToUpdate, updatedPost.body);
});

test("ex:4.23-testing add a blog fails with the proper status code 401 fails ", async () => {
  const { token } = await getTokenAndLogin();
  const newBlog = {
    title: "Test new blog",
    author: "test author",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

after(async () => await mongoose.connection.close());
