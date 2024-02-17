const { test, describe } = require("node:test");
const assert = require("node:assert");

const { blogs, mostBlogs } = require("../utils/list_helper");

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
