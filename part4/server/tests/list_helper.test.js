const { test, describe } = require("node:test");
const assert = require("node:assert");

const {
  dummy,
  totalLikes,
  blogs,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

test("dummy return one", () => {
  assert.strictEqual(dummy(blogs), 1);
});

describe("total likes", () => {
  test("when list has multiple blogs, equals the sum of all likes", () => {
    assert.strictEqual(totalLikes(blogs), 34);
  });

  test("when list has no blogs, equals 0", () => {
    assert.strictEqual(totalLikes([]), 0);
  });
});

describe("favorite blog", () => {
  test("when list has blogs, the favorite one is the most liked", () => {
    assert.deepEqual(favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("when list is empty", () => {
    assert.strictEqual(favoriteBlog([]), null);
  });
});

describe("most blogs by author", () => {
  test("when list has multiple blogs returns the most active author", () => {
    assert.deepEqual(mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("when list has no authors returns null", () => {
    assert.strictEqual(mostBlogs([]), null);
  });
});

describe("most likes by author", () => {
  test("when list has multiple posts, return object of most liked author", () => {
    assert.deepEqual(mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when list has no authors returns null", () => {
    assert.strictEqual(mostLikes([]), null);
  });
});
